import { useRef, useState, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { LuAlarmPlus } from "react-icons/lu";
import {FiMusic, FiVolume,FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi";
import { music } from "./constants";
import AlarmCard from "./AlarmCard";
const Alarm = () => {
  const audioRef = useRef(null);
  const [showHours,setShowHours] = useState(0);
  const hours=useRef("hrs");
  const mins=useRef("mins");
  const ampm=useRef(null);
  const [showMins,setShowMins] = useState(0);
  const [showAlarm,setShowAlarm] = useState(0);
  const [showslider,setShowSlider]=useState(0);
  const [volume,setVolume] = useState(100);
  const [showTone,setShowTone] = useState(0);
  const [tone, setTone] = useState("/alarm_clock.mp3");
  const [alarm, setAlarm] = useState(0);
  const [alarmsList,setAlarmsList] = useState([]);
  const [showPopup,setShowPopup] = useState(0);
  const [tonePopup,showTonePopup] = useState({});
  const [prevIdx, setPrevIdx] = useState(0);
  const musictimeoutID=useRef(null);

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
  const handlePopup = (id) => {
    const copy={...tonePopup};
    if(prevIdx !== id){
      copy[prevIdx]=0;
    }
    copy[id]=copy[id]^1;
    setPrevIdx(id);
    showTonePopup(copy);
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

  const handleVolume = (event) => {
    if(audioRef.current){
      const val = parseInt(event.target.value);
      audioRef.current.volume=val/100;
      setVolume(val);
      audioRef.current.play();
    }
  }
  const handleTone = async (url) => {
    setTone(url);
    setShowTone(0);
    if(musictimeoutID.current){
      clearTimeout(musictimeoutID);
    }
    if (audioRef.current && tone) {
      await audioRef.current.load();  
      try {
        // Wait for the audio to be ready before playing
        audioRef.current.play();
  
        // Pause the audio after 8 seconds and reset
        musictimeoutID.current = setTimeout(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0; // Reset the audio
        }, 8000);
      } catch (error) {
        console.error("Error playing audio:", error);
        // Handle any play-related errors (e.g., user interaction required)
      }
      }
      return () => {clearTimeout(musictimeoutID)}
    }

  const handleAlarm = () => {
    const newobj = {h:hours.current , m:mins.current, ap:ampm.current };
    const keyCount = Object.keys(tonePopup).length+1;
    const newitem = {keyCount : 0};
    const copy={...tonePopup, newitem};
    setAlarm(1);
    alarmShowHandler();
    setShowPopup(1);
    setAlarmsList([...alarmsList , newobj]);
    showTonePopup(copy);
    setTimeout(() => {
      setShowPopup(0);
    },4000);
  }
  const addAlarm = () => {
    setShowAlarm(1);
  }
  const handleSliderShow = () => {
    if(audioRef.current && showslider === 1){
      audioRef.current.pause();
      audioRef.current.currentTime=0;
    }
    setShowSlider(showslider^1);
  }
  const handleToneShow = () => {
    if(audioRef.current && showTone === 1){
      audioRef.current.pause();
      audioRef.current.currentTime=0;
    }
    setShowTone(showTone^1);
  }
  const alarmShowHandler = () => {
    clearTimeout(musictimeoutID);
    audioRef.current=null;
    setShowAlarm(showAlarm^1);
  }
  const hoursList = populateli(1,12);
  const minutesList = populateli(0,59);

  return (
    showAlarm === 0 ? 
      alarm === 0 ?
    (<div className="flex flex-grow justify-center items-center">
      <div>
        <button className="transition ease-in-out delay-150 rounded-full size-32 bg-gray-700 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300 hover:cursor-pointer px-6" onClick={() => setShowAlarm((alarm+1)%2)}><LuAlarmPlus className="size-20"/><p>Add Alarm</p></button>
      </div>
    </div> )
    :
      (<div className="flex flex-col h-screen w-11/12 p-10 gap-5">
        {alarmsList.map((item,index) => (
          <AlarmCard key={index} id={index+1} alarm={item} handlePopup={handlePopup} tonePopup={tonePopup} tone={setTone} vol={setVolume} seek={audioRef} handleVolume={handleVolume} handleTone={handleTone}/>
        ))}
        <button className="size-20 pb-2 self-center bg-gray-800 rounded-full hover:bg-gray-500" onClick={addAlarm}><p className="text-6xl text-center text-sky-400">+</p></button>
      </div>)
    :
  (<div className="fixed z-40 h-full w-full top-0 right-0 backdrop-blur-sm text-6xl text-white">
    <button className="absolute" onClick={alarmShowHandler}><IoArrowBackOutline className="size-20 text-white"/></button>
    <div className="grid h-full w-full justify-center">
    <div className="flex justify-center items-end gap-x-10">
      <div className="grid">
        <button id="hourbox" className="h-28 w-36 bg-slate-800 bg-opacity-40 border-4 border-indigo-600 text-6xl text-center text-gray-500 focus:outline-white" onClick={() => handleShow(1)}>{hours.current}</button>
          {showHours ? 
          (<ul className="z-20 absolute bg-gray-800 bottom-40 h-28 w-36 text-3xl text-center text-white overflow-y-scroll">
              {hoursList.map((item) => (
                <li key={item}><button className="w-full hover:bg-gray-700" onClick={() => setHours(item)}>{item}</button></li>
              ))}
          </ul>) : null
          }
      </div>
      <span className="pb-14">:</span>
      <div className="grid">
        <button id="minbox" className="h-28 w-36 bg-slate-800 bg-opacity-40 border-4 border-indigo-600 text-6xl text-center text-gray-500 focus:outline-white" onClick={() => handleShow(2)}>{mins.current}</button>
          {showMins ? 
          (<ul className="absolute bg-gray-800 bottom-40 h-28 w-36 text-3xl text-center text-white overflow-y-scroll">
            {minutesList.map((item) => (
                <li key={item}><button className="w-full hover:bg-gray-700" onClick={() => setMinutes(item)}>{item}</button></li>
              ))}
          </ul>) : null
          }
      </div>
      <select className="h-28 w-36 bg-gray-800 bg-opacity-40 border-4 border-indigo-600 text-6xl text-center text-white focus:outline-white" name="ampm" onChange={setAmpm} onClick={() => handleShow(3)}>
        <option className=" bg-gray-800 text-4xl" value=""></option>
        <option className=" bg-gray-800 text-4xl" value="AM">AM</option>
        <option className=" bg-gray-800 text-4xl" value="PM">PM</option>
      </select>
      </div>
      <div className="flex justify-evenly items-center">
      <button onClick={handleSliderShow}>
            {
              volume === 0 ? <FiVolumeX className=" relative size-14 transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300 hover:cursor-pointer"/> : 
              volume > 0 && volume <= 30 ? <FiVolume className=" relative size-14 transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300 hover:cursor-pointer"/> : 
              volume > 30 && volume <= 70 ? <FiVolume1 className=" relative size-14 transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300 hover:cursor-pointer"/> :
              volume > 70 && volume <= 100 ?<FiVolume2 className=" relative size-14 transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300 hover:cursor-pointer"/> : null 
            }
            </button>
            {showslider === 1 ? (<input className="absolute bottom-24 left-20" type="range" min="0" max="100" value={volume} onChange={handleVolume}/>):null}
        <button className="bg-gray-800 rounded-full hover:bg-gray-500" onClick={handleAlarm}><p className="size-20 text-sky-400">+</p></button>
        <button onClick={handleToneShow}><FiMusic className="size-14 transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300 hover:cursor-pointer"/></button>
        {showTone === 1 ? 
        <div className="absolute right-2 bottom-10 h-24 w-28 overflow-y-scroll text-base text-center bg-gray-800 rounded-lg">
          <ul className="flex flex-col">
            {music.map((sound,index) => (
              <button key={index} onClick={() => handleTone(sound.url)}><li key={index} className="py-1">Sound {index+1}</li></button>
            ))}
          </ul>
        </div> :
        null
        }
        <audio ref={audioRef}>
          <source src={tone} type="audio/mpeg"/>
        </audio>
      </div>
      </div>
    </div>)
  );
};

export default Alarm;