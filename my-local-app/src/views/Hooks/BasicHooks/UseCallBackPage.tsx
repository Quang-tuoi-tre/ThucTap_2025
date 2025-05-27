import { memo, useCallback, useState } from "react";

// Định nghĩa kiểu cho props của Content
interface ContentProps {
  onIncrease: () => void; 
}

const Content = memo<ContentProps>(({ onIncrease }) => {
  console.log("Content rerender...");
  return (
    <div>
      <h1>Content</h1>
      <button onClick={onIncrease}>Increase</button>
    </div>
  );
});

export function UseCallPagePage() {
  const [number, setNumber] = useState(0);

  const handleIncrease = useCallback(() => {
    setNumber((number) => number + 1);
  }, []);

  return (
    <div>
      <h1>{number}</h1>
      <Content onIncrease={handleIncrease} />
    </div>
  );
}
