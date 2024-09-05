import { useRef, useState,useEffect} from "react";
import { FiMusic, FiVolume,FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi";
const Clock = () => {
  const [showTime,setTime] = useState("");
  const secdeg=useRef(0);
  const mindeg=useRef(0);
  const hourdeg=useRef(0);
  const time = useRef("");
  const [showslider,setShowSlider]=useState(0);
  const [volume,setVolume] = useState(0);
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

  const handleVolume = (event) => {
    const val = parseInt(event.target.value);
    setVolume(val);
  }

  return (
    <div className="flex flex-grow">
      <div style={{width : '430px', height : '430px'}} className="flex m-auto mt-10 rounded-full items-center justify-center border-8 border-indigo-500 border-hidden md:border-solid">
        <div className="relative h-full w-full">
          <div style={{left:"50%", transform:`rotate(${secdeg.current}deg)`, transformOrigin:"bottom center"}} className="absolute z-20 top-8 h-44 w-1 bg-violet-600 hidden md:block"></div>
          <div style={{left:"50%", transform:`rotate(${mindeg.current}deg)`, transformOrigin:"bottom center"}} className="absolute z-0 top-12 h-40 w-2 bg-sky-500 hidden md:block"></div>
          <div style={{left:"50%", transform:`rotate(${hourdeg.current}deg)`, transformOrigin:"bottom center"}} className="absolute z-10 top-24 h-28 w-2 bg-red-500 hidden md:block"></div>
          <div style={{left : "195px"}} className="absolute text-2xl hidden md:block ">12</div>
          <div className="absolute right-24 top-6 text-2xl hidden md:block ">1</div>
          <div className="absolute right-8 top-24 text-2xl hidden md:block ">2</div>
          <div className="absolute right-1 top-48 text-2xl hidden md:block ">3</div>
          <div className="absolute right-8 bottom-24 text-2xl hidden md:block ">4</div>
          <div className="absolute right-28 bottom-6 text-2xl hidden md:block ">5</div>
          <div style={{left : "200px", top : "380px"}} className="absolute text-2xl hidden md:block ">6</div>
          <div className="absolute right-72 bottom-6 text-2xl hidden md:block ">7</div>
          <div className="absolute left-8 bottom-24 text-2xl hidden md:block ">8</div>
          <div className="absolute left-2 top-48 text-2xl hidden md:block ">9</div>
          <div className="absolute left-8 top-24 text-2xl hidden md:block ">10</div>
          <div className="absolute left-24 top-6 text-2xl hidden md:block ">11</div>
          <div style={{left:"28%", top:"42%"}} className="absolute z-30 border-2 border-indigo-500 bg-sky-600/35 rounded-3xl border-hidden p-1 text-5xl md:border-solid md:text-4xl md:m-auto" ><h1>{time.current}</h1></div>
        </div>
      </div>
      <div className="flex flex-grow justify-center items-center">
        <div className="grid justify-center gap-44">
          <button><FiMusic className="size-14 transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300 hover:cursor-pointer"/></button>
          <div className="relative">
            <button onClick={() => setShowSlider((showslider+1)%2)}>
            {
              volume === 0 ? <FiVolumeX className=" relative size-14 transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300 hover:cursor-pointer"/> : 
              volume > 0 && volume <= 30 ? <FiVolume className=" relative size-14 transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300 hover:cursor-pointer"/> : 
              volume > 30 && volume <= 70 ? <FiVolume1 className=" relative size-14 transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300 hover:cursor-pointer"/> :
              volume > 70 && volume <= 100 ?<FiVolume2 className=" relative size-14 transition ease-in-out delay-150 text-sky-400 hover:-translate-y-1 hover:scale-110 hover:text-indigo-500 duration-300 hover:cursor-pointer"/> : null 
            }
            </button>
            {showslider === 1 ? (<input className="absolute top-3/4 left-0" type="range" min="0" max="100" value={volume} onChange={handleVolume}/>):null}
          </div>
        </div>
      </div>
      <audio src=""></audio>
    </div>
    );
};

export default Clock; 
