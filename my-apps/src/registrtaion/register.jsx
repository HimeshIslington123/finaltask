import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");

  const submitlogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/register", {
        email,
        password,
        name,
      });

      console.log(response.data.message);
      alert("Registration successful");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col p-[50px] items-center justify-center">
      <form onSubmit={submitlogin} className="bg-slate-200 p-[50px] flex flex-col justify-center items-center">
        <h5 className="text-[20px] m-[20px] text-center">Register</h5>
        <div className="flex flex-col gap-[20px]">
          <input value={email} name="email" onChange={(e) => setemail(e.target.value)} placeholder="Enter your email" className="bg-gray-100" type="email" />
          <input value={password} name="password" onChange={(e) => setpassword(e.target.value)} placeholder="Enter your Password" className="bg-gray-100" type="password" />
          <input value={name} name="name" onChange={(e) => setname(e.target.value)} placeholder="Enter your name" className="bg-gray-100" type="text" />
        </div>
        <button type="submit" className="mt-[20px] bg-blue-400 w-[100px] rounded-lg">
          Register
        </button>
      </form>
      <p>Already have an account? Sign in</p>
    </div>
  );
};

export default Register;
