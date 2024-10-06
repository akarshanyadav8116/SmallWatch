import React from "react";
import { useState } from 'react';
import NavBar from './components/NavBar';
import Clock from "./components/Clock";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";
import Alarm from './components/Alarm';

const App = () => {
  const [selectedItem,setItem] = useState(JSON.parse(localStorage.getItem("component")));

  const selectItemHandler = (item) => {
    // console.log("here");
    localStorage.setItem("component",JSON.stringify(item));
    setItem(item);
  }
  return (
    <div className='flex flex-col h-screen w-screen bg-slate-900 text-white pt-5 overflow-hidden font-semibold'>
      <NavBar onButtonClick = {selectItemHandler}/>
    <div className='flex flex-grow justify-center align-middle'>
        <div className='flex h-full w-full justify-center align-middle'>
            {selectedItem === "Clock" && <Clock/>}
            {selectedItem === "Timer" && <Timer/>}
            {selectedItem === "Alarm" && <Alarm/>}
            {selectedItem === "Stopwatch" && <Stopwatch/>}
        </div>
    </div>
    </div>
  );
}

export default App;
