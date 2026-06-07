# React + Express CRUD Application

A full‑stack web application built with **React** (Vite) on the frontend and **Express.js** with **MySQL** on the backend. It demonstrates a simple user management system (list, add, edit, delete) and includes authentication via Google Sign‑In.

---

## Live Demo
[https://obit-react-express.netlify.app/](https://obit-react-express.netlify.app/)

---

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Axios, React Router, Google Sign‑In
- **Backend**: Node.js, Express, MySQL, dotenv, cors, morgan (custom logger)
- **Database**: MySQL (Docker‑compose setup provided)
- **Containerisation**: Docker & Docker‑Compose for the database
- **Deployment**: Frontend hosted on Netlify, backend can be run locally or deployed to any Node host.

---

## Prerequisites
- Node.js ≥ 18
- npm ≥ 9 (or yarn)
- Docker & Docker‑Compose (for the MySQL instance)
- A Google OAuth client ID for sign‑in (optional – see *Authentication* below)

---

## Getting Started
### 1. Clone the repo
```bash
git clone https://github.com/obitwicaksono/react-express-og.git
cd react-express-og
```

### 2. Start the MySQL database (Docker)
```bash
cd backend/docker-mysql
docker compose up -d
```
The database will be available at `localhost:3306` with the credentials defined in `backend/docker-mysql/docker-compose.yml`.

### 3. Backend setup
```bash
cd ../../backend
cp .env.example .env   # create .env if not present
npm install
npm run dev   # starts the server on PORT (default 5000)
```
The API will be reachable at `http://localhost:5000`.

### 4. Frontend setup
```bash
cd ../frontend
cp .env.example .env   # optional – you can set REACT_APP_API_URL here
npm install
npm run dev   # Vite dev server on http://localhost:5173
```
The React app proxies API calls to `http://localhost:5000` (see `.env` for the base URL).

---

## Environment Variables
### Backend (`backend/.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port the Express server listens on | `5000` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL user | `root` |
| `DB_PASSWORD` | MySQL password | `example` |
| `DB_NAME` | Database name | `express_mysql` |
| `JWT_SECRET` | Secret for signing JWTs (if you extend auth) | `changeme` |

### Frontend (`frontend/.env`)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL for the backend API (e.g., `http://localhost:5000`) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID for the **GoogleSignInButton** component |

---

## API Documentation
The backend exposes a simple CRUD API under `/users`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | Returns all users (demo endpoint also returns a static user). |
| `GET` | `/users/:id` | Get a single user by ID. |
| `POST` | `/users` | Create a new user. Body: `{ name: string, email: string }` |
| `PUT` | `/users/:id` | Update a user. Body: same as `POST`. |
| `DELETE` | `/users/:id` | Delete a user.

All responses are JSON. Errors are returned with appropriate HTTP status codes and a `{ error: "message" }` payload.

---

## Frontend Features
- **User List** – displays all users fetched from the API.
- **Add / Edit User** – forms with client‑side validation.
- **Protected Routes** – `ProtectedRoute` component guards pages that require authentication.
- **Google Sign‑In** – easy login via a Google account (`GoogleSignInButton`).
- **Responsive UI** – Tailwind CSS ensures the UI works on mobile and desktop.

---

## Project Structure
```
.
├─ backend                # Express server
│   ├─ src                # Source code
│   │   ├─ config         # DB config
│   │   ├─ controller     # Route handlers
│   │   ├─ middleware     # Request logger, CORS config
│   │   ├─ models         # Sequelize/ORM files (User model)
│   │   └─ routes         # Express routers
│   ├─ docker‑mysql       # Docker compose for MySQL
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
- `dev` – Starts the server with **nodemon** (watch mode).
- `start` – Starts the server without watch.
- `lint` – Runs ESLint.

### Frontend (`npm run` in `frontend`)
- `dev` – Vite development server.
- `build` – Production build.
- `preview` – Preview the production build locally.
- `lint` – Runs ESLint.

---

## Testing
> No automated tests are shipped with this starter. Feel free to add Jest, React Testing Library, or Supertest for the API.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome`).
3. Commit your changes with clear messages.
4. Open a pull request against `main`.
5. Ensure **CodeQL** and **ZAP** scans pass (GitHub Actions).

---

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.

---
