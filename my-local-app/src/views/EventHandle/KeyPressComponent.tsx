import { useState, type SetStateAction } from "react";

//onKeyDown là sự kiện xảy ra khi người dùng nhấn phím trên bàn phím
export const KeyPressComponent = () => {
    const [keyPressed, setKeyPressed] = useState('');
  
    // Hàm xử lý sự kiện khi người dùng nhấn phím
    const handleKeyDown = (e: { key: SetStateAction<string>; }) => {
      setKeyPressed(e.key);  // Lưu phím được nhấn vào state
    };
  
    return (
      <div>
        <input className="border-2 border-gray-300 p-2 rounded"  // Thêm class để định dạng
          type="text" 
          onKeyDown={handleKeyDown}  // Gắn sự kiện onKeyDown
          placeholder="Press any key"
        />
        <p>Key pressed: {keyPressed}</p>  {/* Hiển thị phím đã nhấn */}
      </div>
    );
  };
  
  
  
  
  