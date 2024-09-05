import { useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { LuAlarmCheck,LuAlarmPlus } from "react-icons/lu";

const Alarm = () => {
  const [showHours,setShowHours] = useState(0);
  const hours=useRef("hrs");
  const mins=useRef("mins");
  const ampm=useRef(null);
  const [showMins,setShowMins] = useState(0);
  const [alarm,setShowAlarm] =useState(0);

  const populateli = (start,end) => {
    const listitem = [];
    for(let i=start;i<=end;i++){
      listitem.push((i<10)?("0"+i.toString()):i.toString());
    }
    return listitem;
  }

  const handleShow = (hms) => {
    switch(hms){
      case 1: setShowHours((showHours+1)%2);
              setShowMins(0);
              break;
      case 2: setShowMins((showMins+1)%2);
              setShowHours(0);
              break;
      case 3: setShowHours(0);
              setShowMins(0);
              break;
      default:setShowHours(0);
              setShowMins(0);
              break;
    }
  }

  const setHours = (h) => {
    handleShow(0);
    hours.current=h;
    document.getElementById("hourbox").style.color="white";
  }

  const setMinutes = (m) => {
    handleShow(0);
    mins.current=m;
    document.getElementById("minbox").style.color="white";
  }
  const setAmpm = (event) => {

    ampm.current=event.target.value;
  }

  const addAlarm = () => {
    
  }
  const hoursList = populateli(1,12);
  const minutesList = populateli(0,59);

  return (
    alarm === 0 ? 
    <div className="flex flex-grow justify-center items-center">
      <div>
        <button className="transition ease-in-out delay-150 rounded-full size-32 bg-gray-700 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300 hover:cursor-pointer px-6" onClick={() => setShowAlarm((alarm+1)%2)}><LuAlarmPlus className="size-20"/><p>Add Alarm</p></button>
      </div>
    </div> 
    :
  <div className="fixed z-40 h-full w-full top-0 right-0 backdrop-blur-sm text-6xl text-white">
    <button className="absolute" onClick={() => setShowAlarm((alarm+1)%2)}><IoArrowBackOutline className="size-20 text-white"/></button>
    <div className="grid h-full w-full justify-center">
    <div className="flex justify-center items-end gap-x-10">
      <div className="grid">
        <button id="hourbox" className="h-32 w-44 bg-slate-800 bg-opacity-40 border-4 border-indigo-600 text-6xl text-center text-gray-500 focus:outline-white" onClick={() => handleShow(1)}>{hours.current}</button>
          {showHours ? 
          (<ul className="absolute bg-gray-800 bottom-32 h-36 w-44 text-3xl text-center text-white overflow-y-scroll">
              {hoursList.map((item) => (
                <li key={item}><button className="w-full hover:bg-gray-700" onClick={() => setHours(item)}>{item}</button></li>
              ))}
          </ul>) : null
          }
      </div>
      <span className="pb-12">:</span>
      <div className="grid">
        <button id="minbox" className="h-32 w-44 bg-slate-800 bg-opacity-40 border-4 border-indigo-600 text-6xl text-center text-gray-500 focus:outline-white" onClick={() => handleShow(2)}>{mins.current}</button>
          {showMins ? 
          (<ul className="absolute bg-gray-800 bottom-32 h-36 w-44 text-3xl text-center text-white overflow-y-scroll">
            {minutesList.map((item) => (
                <li key={item}><button className="w-full hover:bg-gray-700" onClick={() => setMinutes(item)}>{item}</button></li>
              ))}
          </ul>) : null
          }
      </div>
      <span> </span>
      <select className="h-32 w-44 bg-gray-800 bg-opacity-40 border-4 border-indigo-600 text-6xl text-center text-white focus:outline-white" name="ampm" onChange={setAmpm} onClick={() => handleShow(3)}>
        <option className=" bg-gray-800 text-4xl" value=""></option>
        <option className=" bg-gray-800 text-4xl" value="AM">AM</option>
        <option className=" bg-gray-800 text-4xl" value="PM">PM</option>
      </select>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-gray-800 rounded-full hover:bg-gray-500" onClick={() => addAlarm}><p className="size-20 text-sky-400">+</p></button>
      </div>
      </div>
    </div>
  );
};

export default Alarm;