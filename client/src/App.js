import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home/Home';
import CreateTask from './CreateTask/CreateTask';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/create-task' element={ <CreateTask/> }/>
        </Routes>
      </BrowserRouter>
      <title>Task Manager</title>
    </div>
  );
}

export default App;
