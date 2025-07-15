import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notice = () => {
  const [notices, setNotices] = useState([]);

  // Fetch notice data once when component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getnotice");
        setNotices(response.data.data); // response.data contains array of notices
      } catch (error) {
        alert("Error fetching notice data");
      }
    };

    getData();
  }, []);

  return (
    <div className=" ">
      <h2 className="text-xl font-semibold mb-4">NOTICE</h2>
       
        <ul>
          {notices.map((notice) => (
            <li key={notice._id} className="mb-4 border p-3 rounded-xl shadow bg-slate-300">
              <h3 className="font-bold text-[20px] sm:text-[30px]">{notice.title}</h3>
              <p className='mb-[50px] mt-[6px]  sm:mb-[20px]   text-[15px] sm:text-[20px] text-justify'>-{notice.description}</p>
              <p>By: {notice.noticer}</p>
              
              <p className=''>SENT AT: {new Date(notice.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      
    </div>
  );
};

export default Notice;
