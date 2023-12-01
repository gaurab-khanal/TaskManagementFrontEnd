import React, { useState, useEffect } from "react";
import Model from "../../common/model/Model";
import Edit from "./Edit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiURL = import.meta.env.VITE_API_BACKEND;

function Completed() {
  const [showModel, setShowModel] = useState(false);

  const [completedTask, setCompletedTask] = useState([]);
  const [taskInfo, setTaskInfo] = useState([]);
  const [trackUpdate, setTrackUpdate] = useState(false);
  const [trackDelete, setTrackDelete] = useState(false);

  

  const getUnstartedTask = () => {
    axios.get(`${apiURL}/category/completed`).then(res => {
      console.log(res.data.task);
      setCompletedTask(res.data.task);
    }).catch(err => {
      console.log(err);
    })
  }

  const deleteSuccess = (message) => {
    return toast.success(message)
  }

  const deleteAction = (id)=>{
    axios.delete(`${apiURL}/deleteTask/${id}`).then(res => {
      setTrackDelete(!trackDelete);
      deleteSuccess(res.data.message)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    if (completedTask && !showModel) {

      getUnstartedTask();
    }
  }, [showModel, trackUpdate, trackDelete]);
  
  const editAction = (task) => {
    console.log("Edit: ", task.id);
    setTaskInfo(task);
    setShowModel(true);
  };
  return (
    <>
      <div className="box-border w-[30%] border-4 p-4 rounded-lg">
        <div className="bg-[#F6F8FB] box-border w-full border-4 p-4 rounded-lg font-black text-lg text-[#304D85]"> Completed </div>
        {completedTask.map((task, index) => (
          <div key={index} className="flex flex-col items-center p-3">
            <div className="bg-blue-400 box-border w-[80%] p-3 border-4">
              <h2 className="text-xl font-serif font-bold">{task.title}</h2>
              <div className="flex justify-between">
                <span> {task.status}</span>
                <div>
                  <button className="mr-1" onClick={() => editAction(task)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-file-edit"
                    >
                      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
                    </svg>
                  </button>
                  <button className="mr-1" onClick={()=>deleteAction(task.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-trash-2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      </div>
      {showModel && (
        <Model show={showModel} setShowModel={setShowModel}>
          <Edit setShowModel={setShowModel} task={taskInfo} setTrackUpdate={setTrackUpdate} />
        </Model>
      )}
    </>
  );
}

export default Completed;
