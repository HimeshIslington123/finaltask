import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate(); // ✅ moved here

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("https://finaltask-mzg5.onrender.com/isLoggedIn", {
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

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return null; // Already redirected in useEffect
  }

  return <>{children}</>;
};

export default AuthWrapper;
