import { useRef, useState,useEffect} from "react";
import { FiMusic} from "react-icons/fi";
const Clock = () => {
  const [showTime,setTime] = useState("");
  const secdeg=useRef(0);
  const mindeg=useRef(0);
  const hourdeg=useRef(0);
  const time = useRef("");
  useEffect(() => {
    const d=new Date().toLocaleTimeString();
    time.current=d;
    setTime(time.current);
  },[]);

  useEffect(() => {
    setTimeout(() => {
      const d=new Date();
      secdeg.current=(d.getSeconds()*6);
      mindeg.current=(d.getMinutes()*6+d.getSeconds()*0.1);
      hourdeg.current=(d.getHours()*30+d.getMinutes()*0.5);
      time.current=d.toLocaleTimeString();
      setTime(time.current);
    }, 1000);
    return () => {
      clearTimeout(time.current);
    };
  },[showTime]);

  return (
    <div className="flex flex-grow">
      <div style={{width : '430px', height : '430px'}} className="flex m-auto mt-10 rounded-full items-center justify-center border-8 border-indigo-500 border-solid">
        <div className="relative h-full w-full">
          <div style={{left:"50%", transform:`rotate(${secdeg.current}deg)`, transformOrigin:"bottom center"}} className="absolute z-20 top-8 h-44 w-1 bg-violet-600"></div>
          <div style={{left:"50%", transform:`rotate(${mindeg.current}deg)`, transformOrigin:"bottom center"}} className="absolute z-0 top-12 h-40 w-2 bg-sky-500"></div>
          <div style={{left:"50%", transform:`rotate(${hourdeg.current}deg)`, transformOrigin:"bottom center"}} className="absolute z-10 top-24 h-28 w-2 bg-red-500"></div>
          <div style={{left : "195px"}} className="absolute text-2xl">12</div>
          <div className="absolute right-24 top-6 text-2xl">1</div>
          <div className="absolute right-8 top-24 text-2xl">2</div>
          <div className="absolute right-1 top-48 text-2xl">3</div>
          <div className="absolute right-8 bottom-24 text-2xl">4</div>
          <div className="absolute right-28 bottom-6 text-2xl">5</div>
          <div style={{left : "200px", top : "380px"}} className="absolute text-2xl">6</div>
          <div className="absolute right-72 bottom-6 text-2xl">7</div>
          <div className="absolute left-8 bottom-24 text-2xl">8</div>
          <div className="absolute left-2 top-48 text-2xl">9</div>
          <div className="absolute left-8 top-24 text-2xl">10</div>
          <div className="absolute left-24 top-6 text-2xl">11</div>
          <div style={{left:"28%", top:"42%"}} className="absolute z-30 border-2 border-indigo-500 bg-sky-600/35 rounded-3xl p-1 text-4xl" ><h1>{time.current}</h1></div>
        </div>
      </div>
    </div>
    );
};

export default Clock; 
