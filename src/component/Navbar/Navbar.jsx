import React,{useState} from "react";
import  AddTask from "../Task/AddTask";
import Model from "../../common/model/Model";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {

  const [showModel, setShowModel] = useState(false);

  const addAction = () => {
    setShowModel(true);
  };

  return (
    <>
      <div  className=" flex items-center justify-between h-20 w-full pr-[5%] bg-blue-400 box-border p-3 border-4 rounded-lg">
        <h1 className="ml-[50%] text-2xl font-serif font-bold">Task Manager</h1>
        <button 
          onClick={() => addAction()}
          type="button"
          className="rounded-full bg-white px-3 py-2 text-sm font-bold text-black shadow-slate-100 hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          AddTask
        </button>
      </div>
      <ToastContainer
          position="bottom-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      {showModel && (
        <Model show={showModel} setShowModel={setShowModel}>
          <AddTask setShowModel={setShowModel} />
        </Model>
      )}
      
    </>
  );
}

export default Navbar;
