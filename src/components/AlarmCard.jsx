import React, { useState } from "react";
import { FiMusic, FiVolume2} from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { music } from "./constants";
const AlarmCard = ({id, alarm, handleTone, removeAlarm, toggleStatus}) => {
  const weekDays=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const [musicPopup, showMusicPopup] = useState(0);
  return (
    <div className="flex justify-between py-3 px-3 h-24 w-full bg-gray-800 rounded-xl">
      <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-normal">{alarm}</h1>
            <ul className="flex font-light gap-3">
              {
                weekDays.map((item,index) => (
                  <button key={index}><li>{item}</li></button>
                ))
              }
            </ul>
      </div>
      <div className="flex w-full justify-end items-center gap-5">
      <div className="flex flex-col justify-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onInput={toggleStatus}
        />
        <div className="w-14 h-8 bg-blue-500 rounded-full peer-checked:bg-gray-100 before:content-[''] before:absolute before:top-1 before:left-7 before:bg-gray-300 before:rounded-full before:h-6 before:w-6 before:transition-all peer-checked:before:-translate-x-6 peer-checked:before:bg-gray-300"></div>
      </label>
      </div>
      <div className="relative flex justify-center items-center">
        <button onClick={() => showMusicPopup(musicPopup^1)}><FiMusic className="text-2xl cursor-pointer"/></button>
        {musicPopup === 1 ?
        <div className="z-10 absolute h-24 w-24 -right-10 top-8 bg-gray-800 border-2 border-sky-400 overflow-y-scroll">
          <ul className="w-full inline-grid text-center gap-2">
            {music.map((item,index) => (
              <li key={index}><button key={index} onClick={() => handleTone(index,item.url)}>Sound {index+1}</button></li>
            ))}
          </ul>
        </div>
        : 
        null}
      </div>
      <div className="flex justify-center items-center">
        <FiVolume2 className="text-2xl"/>
      </div>
      <div className="flex justify-center items-center">
        <button onClick={removeAlarm}><MdDeleteOutline className="text-2xl"/></button>
      </div>
      </div>
    </div>
  );
};

export default AlarmCard;
