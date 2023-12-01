import Navbar from "./component/Navbar/Navbar";
import Task from "./component/Task/Task";


function App() {
  return (
    <>
      <div className="h-screen p-3">
        <Navbar />
        <Task />
      </div>
    </>
  );
}

export default App;
