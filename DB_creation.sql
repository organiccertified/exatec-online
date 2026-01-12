-- Extensions first (fixes citext + uuid generation)
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Enums
DO $$ BEGIN
  CREATE TYPE chapter_role AS ENUM ('member', 'officer', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM ('subscribed', 'unsubscribed');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE rsvp_status AS ENUM ('going', 'cancelled', 'checked_in', 'no_show');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Chapters
CREATE TABLE chapter (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text UNIQUE NOT NULL,
  name         text NOT NULL,
  city         text,
  state        text,
  country      text,
  timezone     text NOT NULL DEFAULT 'America/Chicago',
  is_active    boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- Users (exactly 1 chapter)
CREATE TABLE app_user (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id   uuid NOT NULL REFERENCES chapter(id) ON DELETE RESTRICT,
  email        citext UNIQUE NOT NULL,
  first_name   text,
  last_name    text,
  phone        text,
  role         chapter_role NOT NULL DEFAULT 'member',
  is_active    boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- Distribution lists per chapter
CREATE TABLE dl_list (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id   uuid NOT NULL REFERENCES chapter(id) ON DELETE CASCADE,
  slug         text NOT NULL,
  name         text NOT NULL,
  description  text,
  is_active    boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (chapter_id, slug)
);

-- Subscriptions (user can cancel by setting status)
CREATE TABLE dl_subscription (
  dl_id           uuid NOT NULL REFERENCES dl_list(id) ON DELETE CASCADE,
  user_id         uuid NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  status          subscription_status NOT NULL DEFAULT 'subscribed',
  subscribed_at   timestamptz NOT NULL DEFAULT now(),
  unsubscribed_at timestamptz,
  PRIMARY KEY (dl_id, user_id)
);

-- Events per chapter
CREATE TABLE event (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id      uuid NOT NULL REFERENCES chapter(id) ON DELETE CASCADE,
  slug            text NOT NULL,
  title           text NOT NULL,
  description     text,
  location_name   text,
  location_address text,
  start_at        timestamptz NOT NULL,
  end_at          timestamptz,
  capacity        integer,
  status          event_status NOT NULL DEFAULT 'draft',
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (chapter_id, slug),
  CHECK (capacity IS NULL OR capacity >= 0),
  CHECK (end_at IS NULL OR end_at >= start_at)
);

-- Attendance (user_id deletes cascade when user deletes account)
CREATE TABLE event_attendance (
  event_id       uuid NOT NULL REFERENCES event(id) ON DELETE CASCADE,
  user_id        uuid NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  status         rsvp_status NOT NULL DEFAULT 'going',
  rsvp_at        timestamptz NOT NULL DEFAULT now(),
  checked_in_at  timestamptz,
  notes          text,
  PRIMARY KEY (event_id, user_id)
);

-- Enforce "user can only attend events of their chapter"
CREATE OR REPLACE FUNCTION enforce_same_chapter_event_attendance()
RETURNS trigger AS $$
DECLARE
  user_chapter uuid;
  event_chapter uuid;
BEGIN
  SELECT chapter_id INTO user_chapter FROM app_user WHERE id = NEW.user_id;
  SELECT chapter_id INTO event_chapter FROM event WHERE id = NEW.event_id;

  IF user_chapter IS NULL OR event_chapter IS NULL THEN
    RAISE EXCEPTION 'Invalid user_id or event_id';
  END IF;

  IF user_chapter <> event_chapter THEN
    RAISE EXCEPTION 'User can only attend events in their own chapter';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_enforce_same_chapter_event_attendance
BEFORE INSERT OR UPDATE ON event_attendance
FOR EACH ROW EXECUTE FUNCTION enforce_same_chapter_event_attendance();

-- Helpful indexes
CREATE INDEX idx_app_user_chapter ON app_user(chapter_id);
CREATE INDEX idx_dl_list_chapter ON dl_list(chapter_id);
CREATE INDEX idx_dl_subscription_user ON dl_subscription(user_id);
CREATE INDEX idx_event_chapter_start ON event(chapter_id, start_at);
CREATE INDEX idx_event_attendance_user ON event_attendance(user_id);

-- updated_at trigger helper
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_chapter_updated_at
BEFORE UPDATE ON chapter
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_user_updated_at
BEFORE UPDATE ON app_user
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_dl_list_updated_at
BEFORE UPDATE ON dl_list
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_event_updated_at
BEFORE UPDATE ON event
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
