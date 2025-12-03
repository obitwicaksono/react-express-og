import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserList from "./components/UserList";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";


export default function App() {
  return (
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
      </Routes>
      <Footer />
    </div>
  );
}