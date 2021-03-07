import React, {useState, useEffect} from 'react';
import './App.css';
import {useKeyboardPress} from './utils/useKeyboardPress';
import {entrance, lab} from './data/maps/IMap';
import {isValidMove} from './utils/movement';
import {RenderTile} from "./components/RenderTile";
import Modal from './components/Modal';

export type IPosition = {
    x: number;
    y: number;
}

enum EMap {
    entrance = 'ENTRANCE',
    terminal = 'TERMINAL',
    lab = 'LAB'
}

const App = () => {
    const terminalDoorPosition: IPosition = {x: 7, y: 0};
    const labDoorPosition: IPosition = {x: 2, y: 0};

    const [currentPos, setCurrentPos] = useState<IPosition>({x: 5, y: 5});
    const [currentMap, setCurrentMap] = useState<EMap>(EMap.entrance);

    const [shouldOpenTerminal, setShouldOpenTerminal] = useState(false);

    const forwardPress = useKeyboardPress('w');
    const backwardPress = useKeyboardPress('s');
    const leftPress = useKeyboardPress('a');
    const rightPress = useKeyboardPress('d');

    useEffect(() => {
        // If terminal is open do not listen for key press
        if (!shouldOpenTerminal) {
            if (forwardPress && isValidMove(entrance, currentPos, 'w')) setCurrentPos({x: currentPos.x, y: currentPos.y - 1});
            if (backwardPress && isValidMove(entrance, currentPos, 's')) setCurrentPos({x: currentPos.x, y: currentPos.y + 1});
            if (leftPress && isValidMove(entrance, currentPos, 'a')) setCurrentPos({x: currentPos.x - 1, y: currentPos.y});
            if (rightPress && isValidMove(entrance, currentPos, 'd')) setCurrentPos({x: currentPos.x + 1, y: currentPos.y});
        }

        // eslint-disable-next-line
    }, [forwardPress, backwardPress, leftPress, rightPress, setCurrentPos]);

    useEffect(() => {
        changeMap(currentPos);
    }, [currentPos])

    const changeMap = (position: IPosition) => {
        if (currentMap === EMap.entrance) {
            if (position.x === terminalDoorPosition.x && position.y === terminalDoorPosition.y) setShouldOpenTerminal(true);
            if (position.x === labDoorPosition.x && position.y === labDoorPosition.y) setCurrentMap(EMap.lab);
        }
    }

    const terminal = (
      <div className='terminal'>
          <div className='title-bar'>
              <div className='terminal-text-layout'>
                  <p className='terminal-heading white-text'>MAINCODE</p>
                  <p className='white-text thick-text'><b>COMMANDS</b></p>
                  <ul className='command-list white-text'>
                      <li className='li-item'>Valid command 1</li>
                      <li className='li-item'>Valid command 2</li>
                      <li className='li-item'>Valid command 3</li>
                      <li className='li-item'>Valid command 4</li>
                  </ul>
                  <br/>
                  <span className="">{'>'}</span>
                  <input autoFocus className='input'/>
              </div>
          </div>
      </div>
    );

    return (
        <div className='app'>
            {
                currentMap === EMap.entrance &&
                <div className='map'>
                    {entrance.map((e, i) => <div className='row'>{e.map((tile, j) => RenderTile(tile, i, j))}</div>)}
                    <div className='avatar' style={{left: `${currentPos.x * 10}%`, top: `${currentPos.y * 10}%`}}/>
                </div>
            }
            {
                currentMap === EMap.lab &&
                <div className='map'>
                    {lab.map((e, i) => <div className='row'>{e.map((tile, j) => RenderTile(tile, i, j))}</div>)}
                    <div className='avatar' style={{left: `${currentPos.x * 10}%`, top: `${currentPos.y * 10}%`}}/>
                </div>
            }
            <Modal isOpen={shouldOpenTerminal} onCloseCallback={() => setShouldOpenTerminal(false)}>{terminal}</Modal>
        </div>
    );
}
export default App;