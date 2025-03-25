[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=JonathanGian_Countries-FullStack)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=JonathanGian_Countries-FullStack&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=JonathanGian_Countries-FullStack&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=JonathanGian_Countries-FullStack&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=JonathanGian_Countries-FullStack&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=JonathanGian_Countries-FullStack&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=JonathanGian_Countries-FullStack&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)

# Countries Fullstack

A full-stack application with NestJS backend and React frontend.

## Project Structure

```shell
project-root/
├── backend/   # NestJS application
└── frontend/  # React application
```

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/JonathanGian/Countries-FullStack.git
cd COUNTRIES_FULLSTACK
npm install
```


2. Install all dependencies (both frontend and backend):

```bash
npm run install:all
```

## Development

Start both frontend and backend development servers:

```bash
npm run dev
```

The applications will be available at:

- Frontend: http://localhost:5180
- Backend: http://localhost:3000

### Available Commands

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the backend
- `npm run install:all` - Install dependencies for both projects
- `npm run install:frontend` - Install frontend dependencies
- `npm run install:backend` - Install backend dependencies
- `npm run build` - Build both projects
- `npm run build:frontend` - Build frontend only
- `npm run build:backend` - Build backend only

## Environment Setup

1. Create a `.env` file in the frontend directory:
<!-- shell just for highlighting the text propperly. Do not run these in your terminal -->
```sh
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=Supabase_Anon_key
VITE_OPENWEATHER_API_KEY=YOUR_OPEN_API_KEY
```

2. Create a `.env` file in the backend directory:

```sh
SUPABASE_URL=Your_supabase_URL
SUPABASE_ANON_KEY=Your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Vite
- **Backend:**
  - NestJS
  - TypeScript
  - Supabase

## Development Notes

- The backend includes CORS configuration for the frontend port (5180)
- TypeScript is configured for both frontend and backend
- ESLint and Prettier are set up for code formatting
- Both applications include hot-reload functionality for development

