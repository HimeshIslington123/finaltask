import React, { useState, useEffect } from 'react';
import axios from "axios";

const Home = () => {
  const [taskList, setTaskList] = useState([]);

  const getAllTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getAllTask",{ withCredentials: true });
      setTaskList(response.data.data);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const submitid = async (id) => {
    try {
      await axios.put(`http://localhost:3001/updateStatus/${id}`,{ status: "complete" }, { withCredentials: true });

      getAllTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div >
      {taskList.map((task, index) => (
        <div
          key={index}
          className={
            task.status === "complete"
              ? 'bg-green-300 flex flex-col  p-[10px] rounded-xl mb-[5px] sm:p-[20px] sm:mb-[10px]  '
              : 'bg-red-400 flex flex-col  p-[10px] rounded-xl mb-[5px] sm:p-[20px] sm:mb-[10px]'
          }
        >
          <p className='text-[15px] font-bold sm:text-[17px] md:text-[20px]  uppercase'>{task.description}</p>
          <p className='text-[15px] sm:text-[17px] md:text-[20px]'>Assign to:  {task.assignto}</p>
          <div className='mt-[2px] flex justify-between sm:flex-col '>
            <p className='text-[12x] sm:text-[17px] md:text-[20px]'>Assign Date: {new Date(task.assigndate).toLocaleDateString()}</p>
            <p className='text-[12px] sm:text-[17px] md:text-[20px]'>Due date: {new Date(task.duedate).toLocaleDateString()}</p>
          </div>
          <button className='w-[200px] bg-lime-100 rounded-lg mt-[10px] hover:scale-110 hover:font-bold transition duration-300' onClick={() => submitid(task._id)}>
            Mark as Complete
            
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
