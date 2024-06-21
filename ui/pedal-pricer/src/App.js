import { useState } from 'react';
import Sidebar from "./components/Sidebar";
import Canvas from './components/Canvas';

function App() {

  const [data, setData] = useState([]);
  const [ppi, setPpi] = useState([50]);

  const updateList = (items) => {
      setData(data => [...data, ...items]);
  }

  const clearList = () => {
    setData([]);
  }

  const zoomIn = () => {
    setPpi(ppi => ppi * 1.25);
  }

  const zoomOut = () => {
    setPpi(ppi => ppi * 0.75);
  }

  return (
    <>
      <Sidebar updateList={updateList} clearList={clearList} zoomIn={zoomIn} zoomOut={zoomOut}/>
      <Canvas data={data} ppi={ppi}/>
    </>
  );
}

export default App;
