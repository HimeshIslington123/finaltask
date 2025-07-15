import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminHolidayRequests = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const res = await axios.get("https://finaltask-mzg5.onrender.com/admin/allholidays", {
        withCredentials: true,
      });
      setHolidays(res.data.holidays);
    } catch (err) {
      alert("Failed to fetch holiday requests");
      console.error(err);
    }
  };

  const handleApproval = async (id, status) => {
    try {
      await axios.patch(`https://finaltask-mzg5.onrender.com/admin/updateHoliday/${id}`, {
        status
      }, { withCredentials: true });

      // Refresh the list after update
      fetchHolidays();
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Holiday Requests (Admin View)</h2>
      <ul>
        {holidays.map((holiday) => (
          <li
            key={holiday._id}
            className="mb-4 border p-3 rounded-xl shadow bg-slate-300"
          >
            <h3 className="font-bold text-[20px] sm:text-[30px]">{holiday.title}</h3>
            <p className="mb-[6px] sm:text-[20px] text-[15px] text-justify">
              - {holiday.reason}
            </p>
            <p>Date: {new Date(holiday.date).toLocaleDateString()}</p>
            <p>Applied by: {holiday.user?.name}</p>
            <p>Submitted at: {new Date(holiday.createdAt).toLocaleString()}</p>
            <p>Status: <strong>{holiday.approved}</strong></p>

            {holiday.approved === "pending" && (
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleApproval(holiday._id, "approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(holiday._id, "rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminHolidayRequests;
