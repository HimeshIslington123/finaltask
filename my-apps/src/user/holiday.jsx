import axios from "axios";
import React, { useState, useEffect } from "react";

const Ask_holiday = () => {
  const [data, setdatas] = useState({
    title: "",
    date: "",
    description: "",
  });

  const [myHolidays, setMyHolidays] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdatas((prev) => ({ ...prev, [name]: value }));
  };

  const fetchMyHolidays = async () => {
    try {
      const res = await axios.get("https://finaltask-mzg5.onrender.com/user/myholidays", {
        withCredentials: true,
      });
      setMyHolidays(res.data.holidays);
    } catch (error) {
      console.error("Error fetching my holidays:", error);
    }
  };

  useEffect(() => {
    fetchMyHolidays();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://finaltask-mzg5.onrender.com/submitholiday", data, {
        withCredentials: true,
      });
      console.log(response.data.message);
      alert("Holiday request submitted");
      setdatas({ title: "", date: "", description: "" }); // clear form
      fetchMyHolidays(); // refresh holiday list
    } catch (error) {
      alert("Holiday request not submitted");
      console.error("Error submitting holiday:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          Holiday Request
        </h2>

        <input
          type="text"
          placeholder="Holiday request title"
          name="title"
          value={data.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Describe the reason"
          name="description"
          value={data.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit Request
        </button>
      </form>

      {/* User's own requests */}
      <div className="w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-3">My Submitted Holidays</h3>
        {myHolidays.length === 0 ? (
          <p className="text-gray-600">No holiday requests submitted yet.</p>
        ) : (
          <ul className="space-y-4">
            {myHolidays.map((holiday) => (
              <li key={holiday._id} className="p-4 bg-slate-100 rounded shadow">
                <h4 className="font-bold text-lg">{holiday.title}</h4>
                <p className="text-sm mb-1">Reason: {holiday.reason}</p>
                <p>Date: {new Date(holiday.date).toLocaleDateString()}</p>
                <p>Status: <strong className="capitalize">{holiday.approved}</strong></p>
                <p className="text-xs text-gray-500">
                  Submitted: {new Date(holiday.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Ask_holiday;
