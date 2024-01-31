import './App.css'
import { useState } from 'react';
import Sidebar from "./components/Sidebar";
import Canvas from './components/Canvas';

function App() {

  const [data, setData] = useState([]);

  const updateList = (items) => {
      setData(data => [...data, ...items]);
  }

  const clearList = () => {
    setData([]);
  }

  return (
    <>
      <Sidebar updateList={updateList} clearList={clearList}/>
      <Canvas data={data}/>
    </>
  );
}

export default App;
