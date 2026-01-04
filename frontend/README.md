# Frontend - Amigos Exatec

React + Vite frontend application for the Amigos Exatec Alumni Association website.

## Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   ├── Home.jsx
│   │   ├── Board.jsx
│   │   ├── Contact.jsx
│   │   ├── Register.jsx
│   │   ├── Footer.jsx
│   │   ├── NextEventCarousel.jsx
│   │   └── PastEventsCarousel.jsx
│   ├── pictures/       # Image assets
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.js   # PostCSS configuration
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Features

- Single Page Application (SPA) with React Router
- Responsive design with Tailwind CSS
- Organization selector (Dallas, Chicago, San Antonio, Houston)
- Event carousels (Next Events and Past Events)
- Sign In modal with social authentication options
- Contact form
- Registration page
- Board information page

## Tech Stack

- React 18
- React Router DOM 6
- Tailwind CSS 3
- Vite 5

