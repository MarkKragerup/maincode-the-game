import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useKeyboardPress } from './utils/useKeyboardPress';
import { levels } from './data/maps/IMap';
import { isValidMove, ITransformCB, moveCharacter, movementLoop } from './utils/movement';
import { RenderTile } from './components/RenderTile';
import Modal from './components/Modal';
import avatar from './assets/Asset-1.svg';

/** TODO
 * ES6 import cant import sound files.
 * I cannot get this to work...
 * const soundtrack = require('./assets/soundtrack.mp3');
 */

enum EFaceDirection {
	up = 'face-up',
	down = 'face-down',
	right = 'face-right',
	left = 'face-left'
}

const GameEngine = () => {
	const [currentLevel, setCurrentLevel] = useState<number>(0);

	const [currentTile, setCurrentTile] = useState<{ column: number; row: number }>();
	const [faceDirection, setFaceDirection] = useState<EFaceDirection>(EFaceDirection.down);
	const [isWalking, setIsWalking] = useState(false);

	const [transformMap, setTransformMap] = useState('');
	const [transformChar, setTransformChar] = useState('');

	// Tile logic
	const tileSize = 50;
	const stepsPerTile = 1;
	const stepSize = 1 / stepsPerTile;

	const charTileSizeRatio = 2;
	const charOffSetTiles = 5 * tileSize;

	useEffect(() => {
		movementLoop(setTransformChar, setTransformMap);
	}, []);

	return (
		<div className='frame'>
			<div className='camera'>
				<div
					className='map'
					style={{
						transform: transformMap,
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
							height: `${tileSize * charTileSizeRatio}px`,
							width: `${tileSize * charTileSizeRatio}px`
						}}
					>
						<img src={avatar} alt='avatar' />
					</div>
				</div>
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
