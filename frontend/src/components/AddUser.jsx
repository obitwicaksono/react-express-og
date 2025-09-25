import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [existingEmails, setExistingEmails] = useState([]);

  const navigate = useNavigate();

  // Fetch existing emails when component mounts
  useEffect(() => {
    const fetchExistingEmails = async () => {
      try {
        const response = await axios.get(
          "https://react-express-og.vercel.app/users"
        );
        const emails = response.data.data.map((user) => user.email);
        setExistingEmails(emails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExistingEmails();
  }, []);

  // Email validation handler
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (existingEmails.includes(newEmail)) {
      setEmailError("Email sudah terdaftar!");
      setIsEmailValid(false);
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      return; // Prevent form submission if email is invalid
    }
    try {
      await axios.post("https://react-express-og.vercel.app/users", {
        name,
        email,
        address,
      });
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={saveUser} className="max-w-sm w-full mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className={`bg-gray-50 border ${
              !isEmailValid ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="name@email.com"
            required
          />
          {emailError && (
            <p className="mt-2 text-sm text-red-600">{emailError}</p>
          )}
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Alamat
          </label>
          <textarea
            id="message"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={!isEmailValid}
          className={`text-white ${
            isEmailValid
              ? "bg-blue-700 hover:bg-blue-800"
              : "bg-gray-400 cursor-not-allowed"
          } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
