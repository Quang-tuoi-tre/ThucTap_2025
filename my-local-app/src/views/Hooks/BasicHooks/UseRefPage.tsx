import { useRef, useState } from "react";
import React from 'react'

export function UseRefPage(){
    const [seconds, setSeconds] = useState(120);
    const intervalRef = useRef<number | undefined>(undefined); 
    console.log(intervalRef.current);
  
    const startTimer = () => {
  
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev -1);
      }, 1000);
      console.log(intervalRef.current);
    };
  
    const stopTimer = () => {
      clearInterval(intervalRef.current);
      console.log(intervalRef.current);
    };
  
    return (
      <div>
        <p>Time: {seconds} seconds</p>
        <button className="button-primary" onClick={startTimer}>Start</button>
        <button className="button-primary" onClick={stopTimer}>Stop</button>
      </div>
    );
  }
  