import React from "react";
import { FiMusic, FiVolume2} from "react-icons/fi";
import { music } from "./constants";
const AlarmCard = ({id,alarm, handlePopup, tonePopup, tone, volume, seek, handleVolume, handleTone}) => {
  return (
    <div className="flex justify-between py-3 px-3 h-24 w-full bg-gray-800 rounded-xl">
      <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-normal">{alarm.h} : {alarm.m} : {alarm.ap}</h1>
            <ul className="flex font-light gap-3">
              <button><li>Mon</li></button>
              <button><li>Tue</li></button>
              <button><li>Wed</li></button>
              <button><li>Thu</li></button>
              <button><li>Fri</li></button>
              <button><li>Sat</li></button>
              <button><li>Sun</li></button>
            </ul>
      </div>
      <div className="flex w-full justify-end items-center gap-5">
      <div className="flex flex-col justify-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
        />
        <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-checked:before:translate-x-6 peer-checked:before:bg-white before:content-[''] before:absolute before:top-1 before:left-1 before:bg-white before:border before:border-gray-300 before:rounded-full before:h-6 before:w-6 before:transition-all"></div>
      </label>
      </div>
      <div className="relative flex justify-center items-center">
        <button onClick={() => handlePopup(id)}><FiMusic className="text-2xl cursor-pointer"/></button>
        {tonePopup[id] === 1 ?
        <div className="z-10 absolute h-36 w-24 -right-10 top-8 bg-gray-800 border-2 border-sky-400 overflow-y-scroll">
          <ul className="w-full inline-grid text-center gap-2">
            {music.map((item,index) => (
              <li key={index}>Sound {index+1}</li>
            ))}
          </ul>
        </div>
        : 
        null}
      </div>
      <div className="flex justify-center items-center">
        <FiVolume2 className="text-2xl"/>
      </div>
      </div>
    </div>
  );
};

export default AlarmCard;
