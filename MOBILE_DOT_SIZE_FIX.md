# Mobile Dot Size Fix - Troubleshooting

## Current Configuration

The dots are now configured as:
- **Mobile (default):** `w-1.5 h-1.5` (6px) - 50% smaller than original 12px
- **Desktop (sm and up):** `w-2 h-2` (8px)

## If Changes Aren't Showing on Mobile

### 1. Clear Browser Cache

**Chrome/Edge:**
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. Or: Settings → Privacy → Clear browsing data → Cached images and files

**Firefox:**
1. Press `Ctrl + Shift + Delete`
2. Select "Cached Web Content"
3. Click "Clear Now"

**Safari (iOS):**
1. Settings → Safari → Clear History and Website Data

### 2. Verify Build Includes Changes

```bash
cd frontend
npm run build
```

Check that the build completes successfully.

### 3. Test in Development Mode

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` and:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select a mobile device
4. Check if dots are smaller

### 4. Verify CSS Classes in Browser

1. Open DevTools (F12)
2. Inspect a dot element (`id="next-event-dot-0"`)
3. Check the computed styles
4. Verify `width` and `height` are 6px (0.375rem) on mobile

### 5. Check Responsive Breakpoints

The classes use Tailwind's responsive breakpoints:
- Default (mobile): `w-1.5 h-1.5` (6px)
- `sm:` (640px+): `w-2 h-2` (8px)

To test:
1. Resize browser window to < 640px width
2. Dots should be 6px
3. Resize to > 640px width
4. Dots should be 8px

### 6. Force CSS Regeneration

If changes still don't appear:

```bash
cd frontend
rm -rf dist node_modules/.vite
npm run build
```

### 7. Deploy to Server

If testing on a deployed site:
1. Ensure the build is deployed
2. Clear CDN cache (if using one)
3. Wait a few minutes for cache to clear
4. Hard refresh the page

## Expected Sizes

- **Original:** 12px (w-3 h-3)
- **Current Mobile:** 6px (w-1.5 h-1.5) - 50% smaller
- **Current Desktop:** 8px (w-2 h-2) - 33% smaller

## Code Location

File: `frontend/src/components/NextEventCarousel.jsx`
Line: ~145

```jsx
className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ...`}
```

## Verification Command

To verify the code is correct:
```bash
cd frontend
grep -n "next-event-dot" src/components/NextEventCarousel.jsx
```

Should show the className with `w-1.5 h-1.5 sm:w-2 sm:h-2`

