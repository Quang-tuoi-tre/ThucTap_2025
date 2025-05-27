import { useState, useRef, useEffect } from 'react';

function Home() {
  return (
    <div>
      <h1>Weather App</h1>
      <p>Welcome to the Weather App!</p>
    </div>
  );
}


//UseReducer là một hook trong React cho phép bạn quản lý trạng thái phức tạp hơn bằng cách sử dụng một hàm reducer. Nó thường được sử dụng khi bạn cần quản lý nhiều trạng thái hoặc khi trạng thái của bạn phụ thuộc vào các hành động khác nhau.
//UseRef là một hook trong React cho phép bạn tạo ra một tham chiếu đến một phần tử DOM hoặc một giá trị mà không làm cho component re-render khi giá trị đó thay đổi. Nó thường được sử dụng để truy cập trực tiếp vào các phần tử DOM hoặc để lưu trữ các giá trị mà bạn không muốn làm cho component re-render khi chúng thay đổi.

function useTimer(initialTime) {
  const [seconds, setSeconds] = useState(initialTime);
  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev +1) ;
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  return { seconds, startTimer, stopTimer }; 
}


const TimerComponent = () => {
  const { seconds, startTimer, stopTimer } = useTimer(60); // Sử dụng custom hook

  return (
    <div>
      <p>Time: {seconds} seconds</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
};
const Weather = () => {
  const [city, setCity] = useState('');
  
  const handleChange = (event) => {
    setCity(event.target.value);
  };
  useEffect(() =>{
    document.title = `${city}`;
    console.log(`City changed to: ${city}`); // Ghi log khi city thay đổi
     // Cập nhật tiêu đề trang
  })

  return (
    <div>
      <h1>Weather Information</h1>
      <input 
        type="text" 
        placeholder="Enter city name" 
        value={city} 
        onChange={handleChange}
      />
      <p>Weather in {city}</p>
    </div>
  );
};


export default Home;
export { TimerComponent, Weather }; // Xuất TimerComponent để sử dụng ở nơi khác