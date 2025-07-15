import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("https://react-express-og-production.up.railway.app/users");
    setUser(response.data.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://react-express-og-production.up.railway.app/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-center items-center my-3">
        <Link
          to="/add"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center max-w-xs"
        >
          Add New
        </Link>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:flex justify-center items-start">
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left border-b border-gray-300 font-semibold text-gray-700">
                  No
                </th>
                <th className="p-3 text-left border-b border-gray-300 font-semibold text-gray-700">
                  Nama
                </th>
                <th className="p-3 text-left border-b border-gray-300 font-semibold text-gray-700">
                  Email
                </th>
                <th className="p-3 text-left border-b border-gray-300 font-semibold text-gray-700">
                  Alamat
                </th>
                <th className="p-3 text-left border-b border-gray-300 font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 last:border-b-0"
                >
                  <td className="p-3 text-gray-700">{index + 1}</td>
                  <td className="p-3 text-gray-700">{user.name}</td>
                  <td className="p-3 text-gray-700">{user.email}</td>
                  <td className="p-3 text-gray-700">{user.address}</td>
                  <td>
                    <div className="flex justify-center space-x-2">
                      <Link
                        to={`edit/${user.id}`}
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-1.5"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => deleteUser(user.id)} 
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-1.5"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    #{index + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  {user.name}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Alamat:</span> {user.address}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <Link
                to={`edit/${user.id}`}
                className="flex-1 text-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
              >
                Edit
              </Link>
              <button 
                onClick={() => deleteUser(user.id)} 
                className="flex-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;