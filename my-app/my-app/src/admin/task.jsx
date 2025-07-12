import React, { useState, useEffect } from 'react';
import axios from "axios";

const Task = () => {
  const [taskList, setTaskList] = useState([]);

  const getAllTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/taskall",{ withCredentials: true });
    

      setTaskList(response.data.data); // update state with fetched data
    } catch (error) {
      console.log(error);
      alert("Something wenbht wrong");
    }
  };

  useEffect(() => {
    getAllTasks(); // fetch when component loads
  }, []);

  return (
    <div>
      {taskList.map((task, index) => (
        <div
          key={index}
          className={
            task.status === "complete"
              ? 'bg-green-300 flex flex-col gap-[2px] p-[10px] rounded-xl mb-[5px] sm:p-[20px] sm:mb-[10px]'
              : 'bg-red-400 flex flex-col gap-[2px] p-[10px] rounded-xl mb-[5px] sm:p-[20px] sm:mb-[10px]'
          }
        >
          <p className='text-[12px] font-bold sm:text-[20px]'>{task.description}</p>
          <p className='text-[10px] sm:text-[18px]'>Assign to: {task.assignto}</p>
          <div className='mt-[10px] flex justify-between sm:flex-col sm:mt-[1px]'>
            <p className='text-[8px] sm:text-[15px]'>Assign Date: {task.assigndate}</p>
            <p className='text-[8px] sm:text-[15px]'>Due date: {task.duedate}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;
