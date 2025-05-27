import { useEffect, useReducer } from "react";
import { Button } from 'antd';
import React from 'react';

interface State {
  hours: number;
  minutes: number;
}

interface Action {
  type: string;
}

const initialState: State = { hours: 0, minutes: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'incrementMinutes':
      if (state.hours === 23 && state.minutes === 59) {
        return { 
          hours: 0,  
          minutes: 0 
        };
      }
    
      if (state.minutes === 59) {
        return { 
          ...state, 
          minutes: 0, // Reset phút về 0
          hours: state.hours < 23 ? state.hours + 1 : 23 // Tăng giờ nếu không phải 23
        };
      }
    
      return { 
        ...state, 
        minutes: state.minutes + 1, // Tăng phút
      };
    case 'decrementMinutes':
      if(state.hours === 0 && state.minutes === 0) {
        return { 
          hours: 23, 
          minutes: 59 
        };
      }
      if (state.minutes === 0) {
        return { 
          ...state, 
          minutes: 59, // Reset phút về 59
          hours: state.hours > 0 ? state.hours - 1 : 0  // Giảm giờ nếu không phải 0
        };
      }
      return { 
        ...state, 
        minutes: state.minutes - 1 
      };
    case 'incrementHours':
      return { 
        ...state, 
        hours: state.hours < 23 ? state.hours + 1 : 0,  // Tăng giờ nếu giờ nhỏ hơn 23, nếu không reset về 0
        minutes: state.hours === 23 ? 0 : state.minutes // Nếu giờ là 23, reset phút về 0, nếu không giữ nguyên phút
      };
    case 'decrementHours':
      if (state.hours === 0 && state.minutes <= 59) {
        return { 
          hours: 23,  // Reset giờ về 23
          minutes: 59 // Reset phút về 59
        };
      }
      return { 
        ...state, 
        hours: state.hours > 0 ? state.hours - 1 : 0,  // Giảm giờ nếu lớn hơn 0, nếu không giữ giờ là 0
        minutes: state.hours < 23 ? 59 : state.minutes // Nếu phút là 0, reset phút về 59
      };
    default:
      return state;
  }
}

export const UseReducerPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('Time changed to:', `${state.hours}:${state.minutes}`);
  }, [state.hours, state.minutes]);

  return (
    <div>
      <p>Time: {state.hours}:{state.minutes}</p>
      
      <Button type="primary" onClick={() => dispatch({ type: 'incrementMinutes' })}>Increase Minutes</Button>
      
      <Button type="dashed" onClick={() => dispatch({ type: 'decrementMinutes' })}>Decrease Minutes</Button>

      <br />

      <Button type="primary" onClick={() => dispatch({ type: 'incrementHours' })}>Increase Hours</Button>

      <Button type="dashed" onClick={() => dispatch({ type: 'decrementHours' })}>Decrease Hours</Button>

      <br />
      
      <button className="bg-gray-700">Xin chào Việt Nam</button>
    </div>
  );
};
