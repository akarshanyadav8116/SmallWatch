/* global chrome */
import React, { useEffect, useRef, useState } from "react";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { IoSquareOutline, IoMenuOutline } from "react-icons/io5";
const Timer = () => {

  const [hours,setHours] = useState("");
  const [minutes,setMinutes] = useState("");
  const [seconds,setSeconds] = useState("");
  const [play,setPlay] = useState(0);
  const [ready,setReady] = useState(false);
  const timerid=useRef(null);

  const handleInputChange = (t,event) => {
    const value=event.target.value;
      if(t===1){
        if(value>=0&&value<=23){
        setHours(value);
        }
        else{
          alert("The time entered is not correct!!");
        }
      }
      else if(t===2){
        if(value>=0&&value<=59){
          setMinutes(value);
        }
        else{
          alert("The time entered is not correct!!");
        }
      }
      else{
        if(value>=0&&value<=59){
          setSeconds(value);
        }
        else{
          alert("The time entered is not correct!!");
        }
      }
    }

    useEffect(() => {
      if (localStorage.getItem("endTime")) {
        const currentTime = new Date().getTime();
        const endTime = JSON.parse(localStorage.getItem("endTime"));
        const secondsLeft = Math.floor((endTime - currentTime) / 1000);
  
        if (secondsLeft > 0) {
          const h = Math.floor(secondsLeft / 3600);
          const m = Math.floor((secondsLeft % 3600) / 60);
          const s = Math.floor(secondsLeft % 60);
          let p = 0;
          
          if (localStorage.getItem("playTime")) {
            p = JSON.parse(localStorage.getItem("playTime"));
            chrome.storage.local.set({playTime : p});
          }
          
          setHours(h);
          setMinutes(m);
          setSeconds(s);
          setPlay(p);
        } else {
          setHours(0);
          setMinutes(0);
          setSeconds(0);
          localStorage.removeItem("endTime");
          localStorage.removeItem("playTime");
          setPlay(0);
        }
      }
      
      setReady(true); // LocalStorage values are set, mark ready
    }, []);
  
    // Second useEffect to handle timer updates
    useEffect(() => {
      if (!ready) return; // Only run if ready (i.e., localStorage values are set)
  
      if (play === 1) {
        if (!localStorage.getItem("endTime")) {
          localStorage.setItem("endTime", JSON.stringify(new Date().getTime() + (((hours * 3600) + (minutes * 60) + seconds) * 1000)));
          const endTime = new Date().getTime() + ((hours * 3600 + minutes * 60 + seconds) * 1000);
          chrome.runtime.sendMessage({ type : "setEndTime", endTime });
        }
        localStorage.setItem("playTime", JSON.stringify(1));
        chrome.storage.local.set({playTime : 1});
        timerid.current = setTimeout(decrementTime, 1000);
      } else {
        localStorage.setItem("playTime", JSON.stringify(0));
        localStorage.removeItem("endTime");
        chrome.storage.local.set({playTime : 0});
        clearTimeout(timerid.current);
      }
    }, [seconds, play, ready]); // Include `ready` in dependencies
  

  const decrementTime = () => {
    let h = hours!=="" ? parseInt(hours) : 0;
    let m = minutes!=="" ? parseInt(minutes): 0;
    let s = seconds!=="" ? parseInt(seconds) : 0;
    if(s>0){
      setSeconds(s-1);
    }
    else if(m>0){
      setMinutes(m-1);
      setSeconds(59);
    }
    else if(h>0){
      setHours(h-1);
      setMinutes(59);
      setSeconds(59);
    }
    if(h===0&&m===0&&s===0){
      setPlay(0);
      setHours("");
      setMinutes("");
      setSeconds("");
      localStorage.removeItem("endTime");
      localStorage.removeItem("playTime");
    }
  }

  const playPauseHandler = () => {
    // console.log(hours,minutes,seconds);
    let h = hours!=="" ? parseInt(hours) : 0;
    let m = minutes!=="" ? parseInt(minutes): 0;
    let s = seconds!=="" ? parseInt(seconds) : 0;
    if((h===0)&&(m===0)&&(s===0)){
      alert("Please enter the time!!")
    }
    else{
      setPlay((play+1)%2);
    }
  }

  const resetTime = () => {
    setPlay(0);
    setHours("");
    setMinutes("");
    setSeconds("");
  }

  const setMenuTime = (h,m,s) => {
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  }

  return( 
    <div>
    <div className="flex text-7xl gap-5 pt-16">
      <div className="flex">
        <input className="bg-transparent border-b-2 border-sky-700 focus:border-sky-400 outline-none w-36 h-40 text-center" type="text" placeholder="00" maxLength={2} value={hours} disabled={play===1} onChange={(e) => handleInputChange(1,e)}/>
        <p className="pt-10">:</p>
      </div>
      <div className="flex">
        <input className="bg-transparent border-b-2 border-sky-700 focus:border-sky-400 outline-none w-36 h-40 text-center" type="text" placeholder="00" maxLength={2} value={minutes} disabled={play===1} onChange={(e) => handleInputChange(2,e)}/>
        <p className="pt-10">:</p>
      </div>
      <div className="flex">
        <input className="bg-transparent border-b-2 border-sky-700 focus:border-sky-400 outline-none w-36 h-40 text-center" type="text" placeholder="00" maxLength={2} value={seconds} disabled={play===1} onChange={(e) => handleInputChange(3,e)}/>
      </div>
    </div>
    <div className="flex text-7xl pt-16 pb-16 justify-around">
      <button><IoSquareOutline className="size-14 transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300" onClick={resetTime}/></button>
      <button onClick={playPauseHandler}>{play===0 ? <CiPlay1 className="transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300"/> : <CiPause1 className="transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300"/>}</button>
      <div className="flex">
        <button onClick={()=>{document.getElementById("dropdownHover").classList.toggle("hidden")}}><IoMenuOutline id="dropdownHoverButton" className="relative size-14 transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300"/></button>
        <ul id="dropdownHover" className="absolute h-36 w-32 text-center bg-gray-800 right-5 bottom-10 rounded-lg overflow-x-hidden overflow-y-scroll hidden align text-sm">
          <li><button className="w-full h-full p-2 hover:bg-gray-700" onClick={() => setMenuTime("00","15","00")} disabled={play===1}>15 minutes</button></li>
          <li><button className="w-full h-full p-2 hover:bg-gray-700" onClick={() => setMenuTime("00","30","00")} disabled={play===1}>30 minutes</button></li>
          <li><button className="w-full h-full p-2 hover:bg-gray-700" onClick={() => setMenuTime("00","45","00")} disabled={play===1}>45 minutes</button></li>
          <li><button className="w-full h-full p-2 hover:bg-gray-700" onClick={() => setMenuTime("01","00","00")} disabled={play===1}>60 minutes</button></li>
          <li><button className="w-full h-full p-2 hover:bg-gray-700" onClick={() => setMenuTime("01","30","00")} disabled={play===1}>90 minutes</button></li>
          <li><button className="w-full h-full p-2 hover:bg-gray-700" disabled={play===1}>+</button></li>
        </ul>
      </div>
    </div>
    </div>);
};

export default Timer;