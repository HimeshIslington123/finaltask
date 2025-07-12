import React, { useState ,useEffect} from 'react';
import axios from "axios";

const Addtask = () => {
  const [Task, setTask] = useState({
    title: "",
    description: "",
    assignto: "",
    assigndate: '',
    duedate: "",
    status: "incomplete",
  });
const [users, setUsers] = useState([]);
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/users");
      setUsers(res.data.users); // Save the list to state
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  fetchUsers();
}, []);


  const change = (e) => {
    setTask({ ...Task, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(Task);

    try {
      const response = await axios.post("http://localhost:3001/task", Task);
      alert(response.data.message);
      setTask({title: "",
    description: "",
    assignto: "",
    assigndate: '',
    duedate: "",
    status: "incomplete",})
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={submit} className='bg-gray-200 h-screen p-[10px] flex flex-col gap-[10px]'> 
        <h1>Add task to employee</h1>
        
        <input
          onChange={change}
          name='title'
          value={Task.title}
          type='text'
          placeholder='Enter the title'
          className='h-[40px] p-2'
        />

        <textarea
          onChange={change}
          name='description'
          value={Task.description}
          cols="30"
          rows="5"
          placeholder='Enter the description'
          className='p-2'
        ></textarea>

       <select
  onChange={change}
  name='assignto'
  value={Task.assignto}
  className='h-[40px] p-2'
>
  <option value="">-- Select User --</option>
  {users.map((user, index) => (
    <option key={index} value={user.name}>
      {user.name} ({user.email})
    </option>
  ))}
</select>


        <input
          onChange={change}
          name='assigndate'
          value={Task.assigndate}
          type='date'
          className='h-[40px] p-2'
        />

        <input
          onChange={change}
          name='duedate'
          value={Task.duedate}
          type='date'
          className='h-[40px] p-2'
        />

        <select
          onChange={change}
          name='status'
          value={Task.status}
          className='h-[40px] p-2'
        >
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>

        <button type="submit" className='bg-blue-950 text-white w-[100px] rounded-lg p-[5px]'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addtask;
