import React, {useState, useEffect} from 'react';
import './App.css';
import closebutton from './assets/CustomX.svg'
import {useKeyboardPress} from './utils/useKeyboardPress';
import {entrance, lab} from './data/maps/IMap';
import {isValidMove} from './utils/movement';
import {RenderTile} from "./components/RenderTile";

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

    const forwardPress = useKeyboardPress('w');
    const backwardPress = useKeyboardPress('s');
    const leftPress = useKeyboardPress('a');
    const rightPress = useKeyboardPress('d');

    useEffect(() => {
        if (forwardPress && isValidMove(entrance, currentPos, 'w')) setCurrentPos({
            x: currentPos.x,
            y: currentPos.y - 1
        });
        if (backwardPress && isValidMove(entrance, currentPos, 's')) setCurrentPos({
            x: currentPos.x,
            y: currentPos.y + 1
        });
        if (leftPress && isValidMove(entrance, currentPos, 'a')) setCurrentPos({x: currentPos.x - 1, y: currentPos.y});
        if (rightPress && isValidMove(entrance, currentPos, 'd')) setCurrentPos({x: currentPos.x + 1, y: currentPos.y});
        // eslint-disable-next-line
    }, [forwardPress, backwardPress, leftPress, rightPress, setCurrentPos]);

    useEffect(() => {
        changeMap(currentPos);
    }, [currentPos])

    const changeMap = (position: IPosition) => {
        if (currentMap === EMap.entrance) {
            if (position.x === terminalDoorPosition.x && position.y === terminalDoorPosition.y) setCurrentMap(EMap.terminal);
            if (position.x === labDoorPosition.x && position.y === labDoorPosition.y) setCurrentMap(EMap.lab);
        }
    }

    return (
        <div>
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
            {
                currentMap === EMap.terminal &&
                <div className='terminal'>
                    <div className='title-bar'>
                        <div className='close-button' onClick={() => setCurrentMap(EMap.entrance)}>
                            <img src={closebutton} className='cross' height={12} width={12}/>
                        </div>
                    </div>
                    <p className='terminal-text'><span className='green-text'>loui@louis-macbook-pro</span>:<span
                        className='green-blue'>~</span>%</p>
                </div>
            }
        </div>
    );
}
export default App;