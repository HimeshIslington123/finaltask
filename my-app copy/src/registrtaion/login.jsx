import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate()
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const changemail = (e) => {
    setemail(e.target.value);
    console.log(email);
  };

  const changepassword = (e) => {
    setpassword(e.target.value);
    console.log(password);
  };

  const submit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:3001/login",
      { email, password },
      { withCredentials: true }
    );
    console.log(response.data.message);
    
    alert("Login successful");
    navigate("/user/home");
  } catch (error) {
    alert("Login failed");
    console.error(error.response?.data || error.message);
  }
};


  return (
    <div className='flex flex-col p-[50px] items-center justify-center'>
      <form onSubmit={submit} className='bg-slate-200 p-[50px] flex flex-col justify-center items-center'>
        <h5 className='text-[20px] m-[20px] text-center'>Login</h5>
        <div className='flex flex-col gap-[20px]'>
          <input
            value={email}
            name='email'
            onChange={changemail}
            placeholder='Enter your email'
            className='bg-gray-100'
            type='email'
          />
          <input
            value={password}
            name='password'
            onChange={changepassword}
            placeholder='Enter your Password'
            className='bg-gray-100'
            type='password'
          />
        </div>
        <button className='mt-[20px] bg-blue-400 w-[100px] rounded-lg'>Login</button>
      </form>

      <p>Already have an account? Sign in</p>
    </div>
  );
};

export default Login;
