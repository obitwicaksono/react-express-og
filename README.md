# React + Express CRUD Application

A full‑stack web application built with **React** (Vite) on the frontend and **Express.js** with **PostgreSQL (Neon)** on the backend. It demonstrates a simple user management system (list, add, edit, delete) and includes authentication via Google Sign‑In.

---

## Website
[https://obit-react-express.netlify.app/](https://obit-react-express.netlify.app/)

---

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Axios, React Router, Google Sign‑In
- **Backend**: Node.js, Express, PostgreSQL (Neon), dotenv, cors
- **Database**: PostgreSQL via Neon (serverless, free tier)
- **Deployment**: 
  - Frontend: Netlify ([Live Demo](https://obit-react-express.netlify.app/))
  - Backend: Vercel ([API Endpoint](https://react-express-og.vercel.app))
  - Database: Neon PostgreSQL (serverless)

---

## Prerequisites
- Node.js ≥ 16
- npm ≥ 8 (or yarn)
- A Neon account (free tier available at [neon.tech](https://neon.tech))
- A Google OAuth client ID for sign‑in (optional – see *Authentication* below)

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/obitwicaksono/react-express-og.git
cd react-express-og
```

### 2. Setup Neon PostgreSQL Database
1. Visit [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy your **connection string** (looks like: `postgresql://user:pass@host.neon.tech/dbname`)
4. Keep this connection string for the next step

### 3. Backend setup
```bash
cd backend
npm install
```

Create `backend/.env` file:
```env
PORT=4000
DATABASE_URL=postgresql://your-user:your-password@your-host.neon.tech/your-database?sslmode=require
```

**Example:**
```env
PORT=4000
DATABASE_URL=postgresql://neondb_owner:abc123@ep-cool-morning-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
```

Test the database connection:
```bash
npm run db:test
```

Run the migration to create tables:
```bash
npm run db:migrate
```

Start the development server:
```bash
npm run dev
```
The API will be reachable at `http://localhost:4000`.

### 4. Frontend setup
```bash
cd ../frontend
npm install
```

Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

Start the development server:
```bash
npm run dev
```
The React app will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port the Express server listens on | `4000` |
| `DATABASE_URL` | PostgreSQL connection string from Neon | `postgresql://user:pass@host.neon.tech/db?sslmode=require` |

**Note:** The backend now uses a **connection string** instead of individual host/user/password variables for simpler configuration.

### Frontend (`frontend/.env`)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL for the backend API | `http://localhost:4000` (dev) or `https://your-backend.vercel.app` (prod) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | `123456789-abc.apps.googleusercontent.com` |

**Important:** 
- Environment variables must be prefixed with `VITE_` to be accessible in Vite apps
- For **Netlify deployment**, set these variables in the Netlify dashboard (Site settings → Environment variables)
- Do **NOT** commit `.env` files to Git (they're already in `.gitignore`)

---

## API Documentation
The backend exposes a simple CRUD API under `/users`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | Returns all users |
| `GET` | `/users/:id` | Get a single user by ID |
| `POST` | `/users` | Create a new user. Body: `{ name: string, email: string, address: string }` |
| `PATCH` | `/users/:id` | Update a user. Body: same as `POST` |
| `DELETE` | `/users/:id` | Delete a user |

All responses are JSON. Errors are returned with appropriate HTTP status codes and a `{ message: "error message" }` payload.

---

## Frontend Features
- **User List** – displays all users fetched from the API
- **Add / Edit User** – forms with client‑side validation
- **Protected Routes** – `ProtectedRoute` component guards pages that require authentication
- **Google Sign‑In** – easy login via a Google account (`GoogleSignInButton`)
- **Responsive UI** – Tailwind CSS ensures the UI works on mobile and desktop

---

## Project Structure
```
.
├─ backend                # Express server
│   ├─ src                # Source code
│   │   ├─ config         # DB config (PostgreSQL connection)
│   │   ├─ controller     # Route handlers
│   │   ├─ middleware     # Request logger, CORS config
│   │   ├─ models         # Database models (User model)
│   │   ├─ routes         # Express routers
│   │   └─ migrations     # Database migrations
│   ├─ test-connection.js # Test database connection
│   ├─ run-migration.js   # Run database migrations
│   ├─ MIGRATION_GUIDE.md # Detailed migration documentation
│   └─ .env               # Environment variables (backend)
├─ frontend               # React app (Vite)
│   ├─ src                # React source files
│   │   ├─ components     # UI components (AddUser, EditUser, Header, …)
│   │   ├─ contexts       # Auth context
│   │   └─ pages/routes   # Main, Home, etc.
│   ├─ public             # Static assets
│   └─ .env               # Environment variables (frontend)
├─ .github                # CI / CodeQL / ZAP workflow definitions
└─ README.md              # This documentation (you are reading it!)
```

---

## Scripts

### Backend (`npm run` in `backend`)
- `dev` – Starts the server with **nodemon** (watch mode)
- `start` – Starts the server without watch
- `db:test` – Test connection to Neon database
- `db:migrate` – Run database migrations (create tables)

### Frontend (`npm run` in `frontend`)
- `dev` – Vite development server
- `build` – Production build
- `preview` – Preview the production build locally
- `lint` – Runs ESLint

---

## Database Migration

This project has been migrated from Railway MySQL to Neon PostgreSQL for better performance, scalability, and cost efficiency.

### Key Changes

- **Query syntax**: `?` placeholders → `$1, $2, $3` (parameterized queries)
- **Database driver**: `mysql2` → `pg` (node-postgres)
- **Configuration**: Individual credentials → Connection string
- **Response format**: MySQL returns `[rows, fields]`, PostgreSQL returns `{rows, fields}`
- **Security**: Removed SQL injection vulnerabilities by using parameterized queries

### Migration Benefits

- ✅ **Free Tier**: 0.5GB storage, 191 compute hours/month
- ✅ **Serverless**: Auto-scale and auto-suspend
- ✅ **Branch Database**: Create database branches for development
- ✅ **Point-in-time Recovery**: Backup and restore capabilities
- ✅ **Better Performance**: Modern PostgreSQL engine
- ✅ **Cost Savings**: ~$60/year compared to paid MySQL hosting

For detailed migration guide, see [`backend/MIGRATION_GUIDE.md`](backend/MIGRATION_GUIDE.md).

---

## Deployment

### Backend (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`
4. Set environment variable in Vercel dashboard:
   - `DATABASE_URL`: Your Neon connection string

### Frontend (Netlify)

1. Connect your GitHub repository to Netlify
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Set environment variables in Netlify dashboard:
   - `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.vercel.app`)
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth client ID
4. Deploy

**Important:** After setting environment variables, trigger a new deploy (not just rebuild) for changes to take effect.

---

## Testing
> No automated tests are shipped with this starter. Feel free to add Jest, React Testing Library, or Supertest for the API.

---

## Documentation

This project includes comprehensive documentation:

- [`MIGRATION_GUIDE.md`](backend/MIGRATION_GUIDE.md) - Complete database migration guide
- [`ENV_CONFIG.md`](frontend/ENV_CONFIG.md) - Frontend environment configuration
- [`FIX_CORS_NETLIFY.md`](FIX_CORS_NETLIFY.md) - Fix CORS issues in production
- [`PRODUCTION_VERIFIED.md`](PRODUCTION_VERIFIED.md) - Production verification report
- [`REMOVE_ENV_FROM_GIT.md`](REMOVE_ENV_FROM_GIT.md) - Security guide for removing credentials from Git

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome`)
3. Commit your changes with clear messages
4. Open a pull request against `main`
5. Ensure **CodeQL** and **ZAP** scans pass (GitHub Actions)

---

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.

---

## Troubleshooting

### Database Connection Issues
If you encounter connection errors:
1. Verify your Neon connection string in `backend/.env`
2. Ensure your Neon database is active (not suspended)
3. Check the connection string format: `postgresql://user:pass@host.neon.tech/db?sslmode=require`
4. Run `npm run db:test` to diagnose connection issues

### Migration Issues
If migrations fail:
1. Check that your database is empty or drop existing tables
2. Verify PostgreSQL syntax compatibility
3. See [`backend/MIGRATION_GUIDE.md`](backend/MIGRATION_GUIDE.md) for detailed troubleshooting

### CORS Errors in Production
If you get CORS errors when deploying to Netlify:
1. Ensure `VITE_API_URL` is set in Netlify dashboard (Site settings → Environment variables)
2. Value should be your backend URL (e.g., `https://your-backend.vercel.app`)
3. **No trailing slash** in the URL
4. Redeploy the site after adding the variable
5. See [`FIX_CORS_NETLIFY.md`](FIX_CORS_NETLIFY.md) for detailed instructions

### Frontend Shows "undefined/users" Error
This means `VITE_API_URL` is not set:
- **Local dev:** Create `frontend/.env` file with `VITE_API_URL=http://localhost:4000`
- **Production (Netlify):** Set the variable in Netlify dashboard, then redeploy

---

**Built with ❤️ by Obit Wicaksono**
