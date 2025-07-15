import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Display = () => {
  const date=new Date().toLocaleDateString()
  const time = new Date().toLocaleTimeString();
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/isLoggedIn", {
          withCredentials: true, // ⚠️ Important for cookie-based auth
        });
        setData(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getData();
  }, []);

  return (
    <div className='bg-lime-100 h-full rounded-xl p-[10px]'>
      <h1 className='text-[20px]'>Welcome {data.user_name}</h1>
      {date} {time}
    </div>
  );
};

export default Display;
