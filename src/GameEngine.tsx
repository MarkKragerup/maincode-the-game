import React, { useState, useEffect } from 'react';
import './App.css';
import { useKeyboardPress } from './utils/useKeyboardPress';
import { levels } from './data/maps/IMap';
import { isValidMove } from './utils/movement';
import { RenderTile } from './components/RenderTile';
import avatar from './assets/Asset-1.svg';
import Terminal from './components/Terminal';


/** TODO
 * ES6 import cant import sound files.
 * I cannot get this to work...
 * const soundtrack = require('./assets/soundtrack.mp3');
 */

export type IPosition = {
	x: number;
	y: number;
}

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
	const [currentTile, setCurrentTile] = useState<{ column: number, row: number }>();
	const [faceDirection, setFaceDirection] = useState<EFaceDirection>(EFaceDirection.up);
	const [isWalking, setIsWalking] = useState(false);
	const [shouldOpenTerminal, setShouldOpenTerminal] = useState(true);


	const forwardPress = useKeyboardPress('w');
	const backwardPress = useKeyboardPress('s');
	const leftPress = useKeyboardPress('a');
	const rightPress = useKeyboardPress('d');

	// Tile logic
	const tileSize = 50;
	const stepsPerTile = 1;
	const stepSize = (1 / stepsPerTile);

	const charTileSizeRatio = 2;
	const charOffSetTiles = 5 * tileSize;

	// In milliseconds.
	const moveSpeed = 100;
	const moveTransitionStyle = `${moveSpeed}ms transform linear`;

	type IMove = {
		difX: number;
		difY: number;
		faceDirection: EFaceDirection;
	}

	/* Handle movement actions */
	useEffect(() => {
		if (!shouldOpenTerminal) {
			let nextMove: IMove = { difX: 0, difY: -stepSize, faceDirection: EFaceDirection.up };
			if (backwardPress) nextMove = { difX: 0, difY: stepSize, faceDirection: EFaceDirection.down };
			if (leftPress) nextMove = { difX: -stepSize, difY: 0, faceDirection: EFaceDirection.left };
			if (rightPress) nextMove = { difX: stepSize, difY: 0, faceDirection: EFaceDirection.right };

			if (forwardPress || backwardPress || leftPress || rightPress) {
				setFaceDirection(nextMove.faceDirection);
				setIsWalking(true);

				// Do one quick move, without having to wait for the interval to trigger
				const immediateMove = { x: currentPos.x + nextMove.difX, y: currentPos.y + nextMove.difY };
				console.log('move: ', immediateMove);
				console.log('stepSize', stepSize);
				console.log('currentpos: ', currentPos);
				setCurrentPos(currentPos => isValidMove(levels[currentLevel], immediateMove, charTileSizeRatio) && !isWalking ? immediateMove : currentPos);

				// Set an interval to run while the key is still pressed
				const interval = setInterval(() => setCurrentPos((currentPos) => {
						const nextPos = { x: currentPos.x + nextMove.difX, y: currentPos.y + nextMove.difY };
						return isValidMove(levels[currentLevel], nextPos, charTileSizeRatio) ? nextPos : currentPos;
					}
				), moveSpeed);

				// When the useEffect ends or is re-triggered, clear the interval
				return () => {
					clearInterval(interval);
					setIsWalking(false);
				};
			}
		}
	}, [forwardPress, backwardPress, leftPress, rightPress]);

	useEffect(() => {
		setCurrentTile({ column: currentPos.x, row: currentPos.y });
		changeMap(currentPos);
	}, [currentPos]);

	const changeMap = (position: IPosition) => {
		if (currentMap === EMap.entrance) {
			if (position.x === terminalDoorPosition.x && position.y === terminalDoorPosition.y) setShouldOpenTerminal(true);
			if (position.x === labDoorPosition.x && position.y === labDoorPosition.y) setCurrentMap(EMap.lab);
		}
	};

	return (
		<div className='frame'>
			<div className='camera'>
				<div className='map'
						 style={{
							 transform: `translate3d(${-currentPos.x * tileSize + charOffSetTiles}px , ${-currentPos.y * tileSize + charOffSetTiles}px, 0)`,
							 transition: moveTransitionStyle,
							 width: `${tileSize * levels[currentLevel][0].length}px`
						 }}>
					{levels[currentLevel].map((row, i) =>
						<div
							key={i} className='row'
							style={{ height: `${tileSize}px` }}>{row.map((tile, j) => RenderTile(tile, j, i, tileSize))}
						</div>)}
					<div
						className={`character ${isWalking ? 'walking' : ''}`}
						style={{
							transform: `translate3d(${currentPos.x * tileSize}px, ${currentPos.y * tileSize}px, 0`,
							transition: moveTransitionStyle,
							height: `${tileSize * charTileSizeRatio}px`,
							width: `${tileSize * charTileSizeRatio}px`
						}}
					>
						<img src={avatar} alt='avatar' />
					</div>
				</div>
			</div>

			{ /* Chrome does not support autoplay */}
			<div className='audio-container'>
				<audio controls>
					<source src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' type='audio/mpeg' />
					Your browser does not support audio
				</audio>
			</div>
			<Terminal isOpen={shouldOpenTerminal} onCloseCallback={() => setShouldOpenTerminal(!shouldOpenTerminal)} />
		</div>
	);
};
export default GameEngine;