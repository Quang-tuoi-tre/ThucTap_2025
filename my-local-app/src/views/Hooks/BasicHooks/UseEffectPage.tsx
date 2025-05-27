import { useEffect, useState } from "react";

export function UseEffectPage(){
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  useEffect(() => {
    // Chạy lại khi `count` hoặc `name` thay đổi
    console.log('Giá trị count đã thay đổi:', count);
    console.log('Giá trị name đã thay đổi:', name);
  }, [count, name]); // Mảng dependency có `count` và `name`

  const handleToggleName = ()=> {
    setName(name => (name === 'John' ? 'Jane' : 'John')); 
  }
  return (
    <div >
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => setCount(prev =>(prev +1))}>Increment Count</button>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"  onClick={handleToggleName}>Toggle Name</button >
    
    </div>
  );
};