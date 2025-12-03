import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoogleSignInButton from "./components/GoogleSignInButton";
import { AuthContext } from "./contexts/AuthContext";
import { googleLogout } from "@react-oauth/google";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route path="add" element={<AddUser />} />
          <Route path="user/edit/:id" element={<EditUser />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

export function Home() {
  const { user } = useContext(AuthContext);

  return (
    <main className="container">
      <h1>Home</h1>
      {!user ? (
        <>
          <p>Silakan sign in dengan Google untuk melanjutkan.</p>
          <GoogleSignInButton />
        </>
      ) : (
        <>
          <p>Signed in as {user.name}</p>
          <Link to="/user">Masuk ke halaman user</Link>
        </>
      )}
    </main>
  );
}

export function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    googleLogout();
    logout();
  };

  return (
    <header className="header">
      <h2>App</h2>
      <div>
        {user ? (
          <>
            <img
              src={user.picture}
              alt={user.name}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
              }}
            />
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : null}
      </div>
    </header>
  );
}
