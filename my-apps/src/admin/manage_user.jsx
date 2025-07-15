import React, { useState, useEffect } from 'react';
import axios from "axios";

const Manage_user = () => {
  const [users, setUsers] = useState([]);

  // Declare fetchUsers here so it's accessible everywhere
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://finaltask-mzg5.onrender.com/users");
      setUsers(res.data.users); // Users = [{ name, email }]
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteuser = async (name) => {
    try {
      await axios.delete(`https://finaltask-mzg5.onrender.com/deltename/${name}`, { withCredentials: true });
      alert("User has been deleted successfully");
      fetchUsers();  // Refresh user list after delete
    } catch (error) {
      alert("Error while deleting user");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Employee List</h2>

      <div className="flex flex-col gap-[10px]">
        {users.map((user, index) => (
          <div key={index} className="bg-gray-700 text-white p-3 rounded-md shadow flex items-center justify-between ">
            {user.name} - {user.email}
            <img
              onClick={() => deleteuser(user.name)}
              src="/delete.png"
              alt="Delete"
              className="w-[20px] h-[20px] cursor-pointer hover:opacity-70"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manage_user;
