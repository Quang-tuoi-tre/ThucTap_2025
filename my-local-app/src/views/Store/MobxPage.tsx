import { useEffect } from "react";
import {mobxClass} from "./MobxClass";
import { observer } from 'mobx-react-lite'; // Import MobX observer
import React from 'react'


export const MobxPage = observer(() => {

    useEffect(() => {
      document.title = `Count: ${mobxClass.count}`;
  }, [mobxClass.count]); 
  
    return (
      <div>
        <h1>Count: {mobxClass.count}</h1>
        <p>Status: {mobxClass.status}</p> {/* Hiển thị computed value */}
        <button className="button-primary" onClick={() => (mobxClass.increment())}>Increment</button>
        <button className="button-primary" onClick={() => mobxClass.decrement()}>Increment</button>
        {/* <h1>Tổng sum1 và sum2 là : {mobxClass.sum}</h1> */}
      </div>
    );
  });