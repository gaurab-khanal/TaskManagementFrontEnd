import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const apiURL = import.meta.env.VITE_API_BACKEND;

function Edit({ task, setShowModel, setTrackUpdate }) {


  const [status, setStatus] = useState(task.status);
  const [title, setTitle] = useState(task.title);

  const editSuccess = () => {
    return toast.success("Task Updated Successfully")
  }

  const editTask = (id, {title,status} )=>{

    axios.put(`${apiURL}/updateTask/${id}`, {title, status}).then(res=>{
      setShowModel(false);
      setTrackUpdate({title,status});
      editSuccess();
    })
    
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    editTask(task.id,{title,status})
    console.log(task.id);
  };

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
          Edit Task
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  autoComplete="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <div className="mt-1">
                <select name="status" value={status}  onChange={(e) => setStatus(e.target.value)}>
                  <option value="">--Select status--</option>
                  <option value="unstarted" >Unstarted</option>
                  <option value="pending" >Pending</option>
                  <option value="completed" >Completed</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
