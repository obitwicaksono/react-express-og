# React + Express CRUD Application

A full‑stack web application built with **React** (Vite) on the frontend and **Express.js** with **PostgreSQL (Neon)** on the backend. It demonstrates a simple user management system (list, add, edit, delete) and includes authentication via Google Sign‑In.

---

## Website
[https://obit-react-express.netlify.app/](https://obit-react-express.netlify.app/)

---

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Axios, React Router, Google Sign‑In
- **Backend**: Node.js, Express, PostgreSQL (Neon), dotenv, cors, morgan (custom logger)
- **Database**: PostgreSQL via Neon (serverless)
- **Deployment**: Frontend hosted on Netlify, backend can be run locally or deployed to any Node host.

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
3. Copy your connection details (host, username, password, database name)
4. Keep these credentials for the next step

### 3. Backend setup
```bash
cd backend
npm install
```

Edit `backend/.env` with your Neon credentials:
```env
PORT=4000
DB_HOST=your-neon-host.neon.tech
DB_USERNAME=your-neon-username
DB_PASSWORD=your-neon-password
DB_NAME=your-neon-database
DB_PORT=5432
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
npm run dev   # Vite dev server on http://localhost:5173
```
The React app proxies API calls to `http://localhost:4000`.

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port the Express server listens on | `4000` |
| `DB_HOST` | PostgreSQL host (Neon endpoint) | - |
| `DB_USERNAME` | PostgreSQL username | - |
| `DB_PASSWORD` | PostgreSQL password | - |
| `DB_NAME` | Database name | - |
| `DB_PORT` | PostgreSQL port | `5432` |

### Frontend (`frontend/.env`)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL for the backend API (e.g., `http://localhost:4000`) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID for the **GoogleSignInButton** component |

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

This project has been migrated from Railway MySQL to Neon PostgreSQL. Key changes:

- **Query syntax**: `?` placeholders → `$1, $2, $3` (parameterized queries)
- **Database driver**: `mysql2` → `pg` (node-postgres)
- **Response format**: MySQL returns `[rows, fields]`, PostgreSQL returns `{rows, fields}`
- **Security**: Removed SQL injection vulnerabilities by using parameterized queries

For detailed migration guide, see [`backend/MIGRATION_GUIDE.md`](backend/MIGRATION_GUIDE.md).

---

## Testing
> No automated tests are shipped with this starter. Feel free to add Jest, React Testing Library, or Supertest for the API.

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
1. Verify your Neon credentials in `.env`
2. Ensure your Neon database is active (not suspended)
3. Check that SSL is enabled in `database.js`
4. Run `npm run db:test` to diagnose connection issues

### Migration Issues
If migrations fail:
1. Check that your database is empty or drop existing tables
2. Verify PostgreSQL syntax compatibility
3. See [`backend/MIGRATION_GUIDE.md`](backend/MIGRATION_GUIDE.md) for detailed troubleshooting

---

**Built with ❤️ by Obit Wicaksono**
