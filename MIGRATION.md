# Project Reorganization - Migration Notes

The project has been reorganized to separate frontend and backend code.

## New Structure

```
amigosExatec/
├── frontend/          # All frontend code (React + Vite)
├── backend/          # Backend API (Node.js)
└── package.json       # Root scripts for running both
```

## Cleanup Required

The following files in the root directory can be safely deleted (they've been copied to `frontend/`):

- `index.html`
- `src/` (entire directory)
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `package-lock.json` (if you want to keep root-level one, you can keep it)

**Note:** The `node_modules` in root can also be deleted if you're using the new structure. The root `package.json` is now for managing both frontend and backend together.

## Next Steps

1. Install root dependencies:
   ```bash
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies (when ready):
   ```bash
   cd backend
   npm install express cors
   ```

4. Run both frontend and backend:
   ```bash
   npm run dev
   ```

Or run them separately:
   ```bash
   npm run dev:frontend  # Frontend only
   npm run dev:backend   # Backend only
   ```

