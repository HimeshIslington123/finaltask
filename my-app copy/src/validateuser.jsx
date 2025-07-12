import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means loading

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("http://localhost:3001/isLoggedIn", {
          withCredentials: true,
        });
        console.log("✅ Logged in:", res.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("❌ Not logged in");
        setIsAuthenticated(false);
      }
    };

    checkLogin();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Optional loading state
  }

  if (!isAuthenticated) {
    // Return Navigate component to redirect
    return <p>login is not done</p>
  }

  return <>{children}</>;
};

export default AuthWrapper;
