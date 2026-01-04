# Amigos Exatec - Alumni Association

A full-stack web application for managing different chapters of the Tec de Monterrey alumni association.

**Repository**: [https://github.com/organiccertified/exatec-online](https://github.com/organiccertified/exatec-online)

## Project Structure

```
amigosExatec/
├── frontend/          # React + Vite frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── backend/          # Backend API server
│   ├── routes/       # API routes
│   ├── controllers/  # Route controllers
│   ├── models/       # Data models
│   └── package.json  # Backend dependencies
└── package.json      # Root package.json with scripts for both
```

## Tech Stack

### Frontend
- React 18
- Tailwind CSS 3
- Vite 5
- React Router DOM

### Backend
- Node.js
- Express (to be implemented)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

Install all dependencies (frontend and backend):

```bash
npm run install:all
```

Or install separately:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Development

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or run separately:

```bash
# Frontend only (runs on http://localhost:5173)
npm run dev:frontend

# Backend only (runs on http://localhost:3001)
npm run dev:backend
```

### Build

Build the frontend for production:

```bash
npm run build
```

### Production

Start the production servers:

```bash
# Frontend preview
npm run start:frontend

# Backend
npm run start:backend
```

## Frontend Features

- **Header**: Organization selector dropdown
- **Navigation**: Home, Register, Board, Contact buttons with social media icons
- **Next Event Carousel**: Interactive carousel displaying upcoming events
- **Past Events Carousel**: Auto-rotating carousel showcasing past events
- **Sign In Modal**: Authentication popup with email/password and social login options
- **Contact Form**: Contact form with name, subject, and message fields
- **Register Page**: Registration page with organization-specific messaging
- **Board Page**: Board member information display

## Color Palette

The website uses Tec de Monterrey's official color palette:
- Primary Blue: #0039a6 (tec-blue)
- Dark Blue: #002d7a (tec-blue-dark)
- Light Blue: #0052d4 (tec-blue-light)

## Backend API

The backend API is currently in development. See `backend/README.md` for more details.

## Deployment

### Hostinger Deployment

This project is configured for deployment on Hostinger hosting. See `HOSTINGER_DEPLOYMENT.md` for detailed deployment instructions.

**Quick deploy:**
```bash
npm run deploy
# or
npm run build:hostinger
```

This builds the frontend for production. Upload the contents of `frontend/dist/` to Hostinger's `public_html/` directory.

**Requirements:**
- Hostinger Business or Cloud hosting plan (for Node.js support)
- Node.js enabled in Hostinger control panel (for backend)

See `HOSTINGER_DEPLOYMENT.md` for complete deployment guide.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

ISC
