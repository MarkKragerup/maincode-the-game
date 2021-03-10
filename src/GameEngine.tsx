import React, { useState, useEffect } from 'react';
import './App.css';
import { levels } from './data/maps/IMap';
import { movementLoop } from './utils/movement';
import { RenderTile } from './components/RenderTile';
import avatar from './assets/Asset-1.svg';

export enum EFaceDirection {
	up = 'face-up',
	down = 'face-down',
	right = 'face-right',
	left = 'face-left'
}

const GameEngine = () => {
	const [currentLevel, setCurrentLevel] = useState<number>(0);

	const [currentTile, setCurrentTile] = useState<{ column: number; row: number }>();
	const [faceDirection, setFaceDirection] = useState<EFaceDirection>(EFaceDirection.down);

	const [transformMap, setTransformMap] = useState('');
	const [transformChar, setTransformChar] = useState('');

	// Tile logic
	const tileSize = 50;
	const stepsPerTile = 1;
	const stepSize = 1 / stepsPerTile;

	const charTileSizeRatio = 2;
	const charOffSetTiles = 5 * tileSize;

	/** Setup the movement for the elements */
	useEffect(() => movementLoop(document.getElementById('character') ?? undefined, document.getElementById('map') ?? undefined), []);

	console.log('re-render');

	return (
		<div id='frame'>
			<div id='camera'>
				<div id='map' style={{ transform: transformMap, width: `${tileSize * levels[currentLevel][0].length}px` }}>
					{levels[currentLevel].map((row, i) => (
						<div key={i} className='row' style={{ height: `${tileSize}px` }}>
							{row.map((tile, j) => RenderTile(tile, j, i, tileSize))}
						</div>
					))}
					<div id={'character'} style={{ transform: transformChar, height: `${tileSize * charTileSizeRatio}px`, width: `${tileSize * charTileSizeRatio}px` }}>
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
