import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
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
        <Route
        path="add"
          element={
            <ProtectedRoute>
            <AddUser />
            </ProtectedRoute>
          }
          />
          <Route
        path="user/edit/:id"
          element={
            <ProtectedRoute>
            <EditUser />
            </ProtectedRoute>
          }
          />
      </Routes>
      <Footer />
    </div>
  );
}