import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useKeyboardPress } from './utils/useKeyboardPress';
import { levels } from './data/maps/IMap';
import { isValidMove, movementLoop } from './utils/movement';
import { RenderTile } from './components/RenderTile';
import Modal from './components/Modal';
import avatar from './assets/Asset-1.svg';

/** TODO
 * ES6 import cant import sound files.
 * I cannot get this to work...
 * const soundtrack = require('./assets/soundtrack.mp3');
 */

export type IPosition = {
	x: number;
	y: number;
};

enum EMap {
	entrance = 'ENTRANCE',
	terminal = 'TERMINAL',
	lab = 'LAB'
}

enum EFaceDirection {
	up = 'face-up',
	down = 'face-down',
	right = 'face-right',
	left = 'face-left'
}

const GameEngine = () => {
	const terminalDoorPosition: IPosition = { x: 7, y: 0 };
	const labDoorPosition: IPosition = { x: 2, y: 0 };

	const [currentPos, setCurrentPos] = useState<IPosition>({ x: 5, y: 5 });
	const [currentMap, setCurrentMap] = useState<EMap>(EMap.entrance);
	const [currentLevel, setCurrentLevel] = useState<number>(0);
	const [currentTile, setCurrentTile] = useState<{ column: number; row: number }>();
	const [faceDirection, setFaceDirection] = useState<EFaceDirection>(EFaceDirection.up);
	const [terminalInput, setTerminalInput] = useState('');
	const [isWalking, setIsWalking] = useState(false);
	const [shouldOpenTerminal, setShouldOpenTerminal] = useState(false);

	const forwardPress = useKeyboardPress('w');
	const backwardPress = useKeyboardPress('s');
	const leftPress = useKeyboardPress('a');
	const rightPress = useKeyboardPress('d');
	const enterPress = useKeyboardPress('Enter');
	const [transformMap, setTransformMap] = useState('');
	const [transformChar, setTransformChar] = useState('');

	// Tile logic
	const tileSize = 50;
	const stepsPerTile = 1;
	const stepSize = 1 / stepsPerTile;

	const charTileSizeRatio = 2;
	const charOffSetTiles = 5 * tileSize;

	// In milliseconds.
	const moveSpeed = 100;
	const moveTransitionStyle = `${moveSpeed}ms transform linear`;

	useEffect(() => {
		movementLoop(setTransformChar, setTransformMap);
	}, []);

	const onTerminalInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => setTerminalInput(ev.target.value);

	const terminal = (
		<div className='terminal'>
			<div className='title-bar'>
				<div className='terminal-text-layout'>
					<p className='terminal-heading white-text'>MAINCODE</p>
					<p className='white-text thick-text'>
						<b>COMMANDS</b>
					</p>
					<ul className='command-list white-text'>
						<li className='li-item'>Valid command 1</li>
						<li className='li-item'>Valid command 2</li>
						<li className='li-item'>Valid command 3</li>
						<li className='li-item'>Valid command 4</li>
					</ul>
					<br />
					<span className=''>{'>'}</span>
					<input autoFocus type='text' className='input' onChange={onTerminalInputChange} onKeyUp={() => console.log('Mathias er til mænd - eller mus?')} />
				</div>
			</div>
		</div>
	);

	return (
		<div className='frame'>
			<div className='camera'>
				<div
					className='map'
					style={{
						transform: transformMap,
						transition: moveTransitionStyle,
						width: `${tileSize * levels[currentLevel][0].length}px`
					}}
				>
					{levels[currentLevel].map((row, i) => (
						<div key={i} className='row' style={{ height: `${tileSize}px` }}>
							{row.map((tile, j) => RenderTile(tile, j, i, tileSize))}
						</div>
					))}
					<div
						className={`character ${isWalking ? 'walking' : ''}`}
						style={{
							transform: transformChar,
							transition: moveTransitionStyle,
							height: `${tileSize * charTileSizeRatio}px`,
							width: `${tileSize * charTileSizeRatio}px`
						}}
					>
						<img src={avatar} alt='avatar' />
					</div>
				</div>
				<Modal isOpen={shouldOpenTerminal} onCloseCallback={() => setShouldOpenTerminal(false)}>
					{terminal}
				</Modal>
			</div>

			{/* Chrome does not support autoplay */}
			<div className='audio-container'>
				<audio controls>
					<source src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' type='audio/mpeg' />
					Your browser does not support audio
				</audio>
			</div>
		</div>
	);
};
export default GameEngine;
