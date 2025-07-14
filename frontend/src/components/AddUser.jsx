import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(""); // State untuk error handling
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/users", {
        name,
        email,
        address,
      });
      
      // Jika MongoDB, response.data akan mengandung _id
      console.log("User created:", response.data);
      navigate("/user");
    } catch (error) {
      if (error.response) {
        // Error dari server (misal: email sudah terdaftar)
        setError(error.response.data.message || "Gagal menambahkan user");
      } else {
        setError("Network error. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={saveUser} className="max-w-sm w-full mx-auto">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@email.com"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;