-- Enable UUID generation (Postgres 13+ usually supports this extension)
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- 1) Chapters
CREATE TABLE IF NOT EXISTS chapter (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text UNIQUE NOT NULL,          -- e.g., "dallas-tx"
  name         text NOT NULL,                 -- e.g., "Dallas, TX"
  city         text,
  state        text,
  country      text,
  timezone     text NOT NULL DEFAULT 'America/Chicago',
  is_active    boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- 2) Users (basic identity; keep auth details separate later if needed)
-- Users (exactly 1 chapter)
CREATE TABLE app_user (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id   uuid NOT NULL REFERENCES chapter(id) ON DELETE RESTRICT,
  email        citext UNIQUE NOT NULL CHECK (btrim(email::text) <> ''),
  matricula    text NOT NULL UNIQUE CHECK (char_length(matricula) = 10),
  first_name   text NOT NULL CHECK (btrim(first_name) <> ''),
  last_name    text NOT NULL CHECK (btrim(last_name) <> ''),
  phone        text NOT NULL CHECK (btrim(phone) <> ''),
  role         chapter_role NOT NULL DEFAULT 'member',
  is_active    boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- CITEXT requires an extension
CREATE EXTENSION IF NOT EXISTS citext;

-- 3) User membership in chapters (many-to-many)
DO $$ BEGIN
  CREATE TYPE chapter_role AS ENUM ('member', 'officer', 'admin');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS chapter_membership (
  chapter_id   uuid NOT NULL REFERENCES chapter(id) ON DELETE CASCADE,
  user_id      uuid NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  role         chapter_role NOT NULL DEFAULT 'member',
  joined_at    timestamptz NOT NULL DEFAULT now(),
  left_at      timestamptz,
  PRIMARY KEY (chapter_id, user_id)
);

-- 4) Distribution lists (DLs) per chapter
CREATE TABLE IF NOT EXISTS dl_list (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id   uuid NOT NULL REFERENCES chapter(id) ON DELETE CASCADE,
  slug         text NOT NULL,                 -- e.g., "general", "jobs"
  name         text NOT NULL,                 -- e.g., "General Announcements"
  description  text,
  is_active    boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (chapter_id, slug)
);

-- 5) DL subscriptions
DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM ('subscribed', 'unsubscribed');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS dl_subscription (
  dl_id        uuid NOT NULL REFERENCES dl_list(id) ON DELETE CASCADE,
  user_id      uuid NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  status       subscription_status NOT NULL DEFAULT 'subscribed',
  subscribed_at   timestamptz NOT NULL DEFAULT now(),
  unsubscribed_at timestamptz,
  PRIMARY KEY (dl_id, user_id)
);

-- 6) Events
DO $$ BEGIN
  CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS event (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id   uuid NOT NULL REFERENCES chapter(id) ON DELETE CASCADE,
  slug         text NOT NULL,                 -- e.g., "jan-2026-networking"
  title        text NOT NULL,
  description  text,
  location_name text,
  location_address text,
  start_at     timestamptz NOT NULL,
  end_at       timestamptz,
  capacity     integer,                       -- null = unlimited
  status       event_status NOT NULL DEFAULT 'draft',
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (chapter_id, slug),
  CHECK (capacity IS NULL OR capacity >= 0),
  CHECK (end_at IS NULL OR end_at >= start_at)
);

-- 7) Event attendance (RSVP)
DO $$ BEGIN
  CREATE TYPE rsvp_status AS ENUM ('invited', 'going', 'waitlisted', 'cancelled', 'checked_in', 'no_show');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS event_attendance (
  event_id     uuid NOT NULL REFERENCES event(id) ON DELETE CASCADE,
  user_id      uuid NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  status       rsvp_status NOT NULL DEFAULT 'invited',
  rsvp_at      timestamptz NOT NULL DEFAULT now(),
  checked_in_at timestamptz,
  notes        text,
  PRIMARY KEY (event_id, user_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_membership_user ON chapter_membership(user_id);
CREATE INDEX IF NOT EXISTS idx_dl_list_chapter ON dl_list(chapter_id);
CREATE INDEX IF NOT EXISTS idx_subscription_user ON dl_subscription(user_id);
CREATE INDEX IF NOT EXISTS idx_event_chapter_start ON event(chapter_id, start_at);
CREATE INDEX IF NOT EXISTS idx_attendance_user ON event_attendance(user_id);

-- Optional: simple updated_at trigger (nice-to-have)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER trg_chapter_updated_at
  BEFORE UPDATE ON chapter
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_user_updated_at
  BEFORE UPDATE ON app_user
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_dl_list_updated_at
  BEFORE UPDATE ON dl_list
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_event_updated_at
  BEFORE UPDATE ON event
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
