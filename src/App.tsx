import React, { useState, useEffect } from 'react';
import './App.css';
import { useKeyboardPress } from './utils/useKeyboardPress';
import { entrance } from './data/maps/IMap';
import { isValidMove } from './utils/movement';

export type IPosition = {
  x: number;
  y: number;
}

const App = () => {
  const [currentPos, setCurrentPos] = useState<IPosition>({ x: 1, y: 1 });

  const forwardPress = useKeyboardPress('w');
  const backwardPress = useKeyboardPress('s');
  const leftPress = useKeyboardPress('a');
  const rightPress = useKeyboardPress('d');

  useEffect(() => {
    if (forwardPress && isValidMove(entrance, currentPos, 'w')) setCurrentPos({ x: currentPos.x, y: currentPos.y - 1 });
    if (backwardPress && isValidMove(entrance, currentPos, 's')) setCurrentPos({ x: currentPos.x, y: currentPos.y + 1 });
    if (leftPress && isValidMove(entrance, currentPos, 'a')) setCurrentPos({ x: currentPos.x - 1, y: currentPos.y });
    if (rightPress && isValidMove(entrance, currentPos, 'd')) setCurrentPos({ x: currentPos.x + 1, y: currentPos.y });
    // eslint-disable-next-line
  }, [forwardPress, backwardPress, leftPress, rightPress, setCurrentPos]);

  console.log(currentPos);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default App;
