import React, { useState } from 'react';
import axios from 'axios';

const AddNotice = () => {
  const [datas, setData] = useState({
    title: '',
    description: '',
    noticer: '',
   
  }); 

  // Handle title, description, noticer
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...datas, [name]: value });
  };

  

  const handleSubmit = async (e) => {
  e.preventDefault(); // call immediately

  try {
    const response = await axios.post(
      "http://localhost:3001/addNotice",
      { datas }, // sending datas object
      { withCredentials: true }
    );
    console.log(response.data.message);
    alert("Notice added");
  } catch (error) {
    console.error(error);
    alert("Notice not submitted");
  }
};


  return (
    <div className='p-[20px] flex flex-col gap-[10px] bg-slate-200 rounded-lg h-full'>
      <p className='text-[17px] sm:text-[30px] font-semibold'>Add notice to employee</p>

      <form className='flex flex-col gap-[10px]' onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={datas.title}
          onChange={handleChange}
          placeholder="Enter the notice title"
          className='w-[200px] sm:w-[350px] p-2 border outline-none rounded-sm h-[40px]'
        />

        <textarea
          name="description"
          value={datas.description}
          onChange={handleChange}
          placeholder="Enter notice description"
          rows="10"
          className='w-[200px] sm:w-[350px] p-2 rounded-sm resize-none outline-none'
        />

       

        <input
          type="text"
          name="noticer"
          value={datas.noticer}
          onChange={handleChange}
          placeholder="Name of noticer"
          className='w-[200px] sm:w-[350px] p-2 border outline-none rounded-sm h-[40px]'
        />

        <button
          type="submit"
          className='w-[120px] rounded-3xl text-white flex justify-center items-center bg-orange-500 py-2'
        >
          ADD NOTICE
        </button>
      </form>
    </div>
  );
};

export default AddNotice;
