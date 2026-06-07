# Frontend Environment Configuration

## Overview
Frontend sekarang menggunakan environment variables untuk API endpoint, sehingga lebih fleksibel untuk development dan production.

## Environment Variables

### `.env` (Development)
```env
VITE_API_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

### `.env.production` (Production)
```env
VITE_API_URL=https://your-backend-api.vercel.app
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

## Setup Instructions

### 1. Copy Example File
```bash
cd frontend
cp .env.example .env
```

### 2. Update Variables
Edit `.env` and set your values:
- `VITE_API_URL`: Backend API URL (default: `http://localhost:4000`)
- `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID

### 3. Start Development Server
```bash
npm run dev
```

## Usage in Components

Semua komponen sekarang menggunakan:

```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Example usage
axios.get(`${API_URL}/users`)
axios.post(`${API_URL}/users`, data)
axios.patch(`${API_URL}/users/${id}`, data)
axios.delete(`${API_URL}/users/${id}`)
```

## Updated Components

- ✅ `UserList.jsx` - GET all users, DELETE user
- ✅ `AddUser.jsx` - POST new user
- ✅ `EditUser.jsx` - GET user by ID, PATCH user

## Important Notes

1. **Vite Environment Variables**
   - Must be prefixed with `VITE_`
   - Accessed via `import.meta.env.VITE_*`
   - Changes require dev server restart

2. **Default Fallback**
   - If `VITE_API_URL` is not set, defaults to `http://localhost:4000`

3. **Production Build**
   - Environment variables are embedded at build time
   - Create `.env.production` for production values
   - Or set via hosting platform (Netlify, Vercel, etc.)

## Testing

### Local Development
```bash
# Terminal 1: Start backend
cd backend
npm run dev  # Runs on http://localhost:4000

# Terminal 2: Start frontend
cd frontend
npm run dev  # Runs on http://localhost:5173
```

Frontend will automatically connect to `http://localhost:4000` based on `.env`

### Production
Set environment variables in your hosting platform:
- **Netlify**: Site Settings → Environment Variables
- **Vercel**: Project Settings → Environment Variables
- **Render**: Environment → Environment Variables

Example:
```
VITE_API_URL=https://react-express-og.vercel.app
```

## Troubleshooting

### API calls fail with CORS error
- Ensure backend is running on the correct port
- Check `VITE_API_URL` matches backend URL
- Verify CORS is enabled in backend

### Environment variable not working
- Restart dev server after changing `.env`
- Ensure variable is prefixed with `VITE_`
- Check console: `console.log(import.meta.env.VITE_API_URL)`

### 404 Not Found
- Verify `VITE_API_URL` doesn't have trailing slash
- Check backend is actually running
- Test backend directly: `curl http://localhost:4000/users`

## Migration from Hardcoded URLs

**Before:**
```javascript
axios.get("https://react-express-og.vercel.app/users")
```

**After:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
axios.get(`${API_URL}/users`)
```

## Benefits

✅ Easy switching between development and production  
✅ No code changes needed for different environments  
✅ Better security (no hardcoded credentials)  
✅ Team collaboration (each dev can use their own config)  
✅ CI/CD friendly (inject variables at build time)  

---

**Last Updated:** 2026-06-07
