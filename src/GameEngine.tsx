import React, { useState, useEffect } from 'react';
import './GameEngine.css';
import { levels } from './data/maps/IMap';
import { charTileSizeRatio, movementLoop, tileSize } from './utils/movement-engine';
import { TileFactory } from './components/tile/TileFactory';
import avatar from './assets/illustrations/Asset-1.svg';

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

	/** Setup the movement for the elements */
	useEffect(() => movementLoop(currentLevel, document.getElementById('character') ?? undefined, document.getElementById('map') ?? undefined), []);

	console.log('re-rendered the app.. very heavy on performance.');

	return (
		<div id='frame'>
			<div id='camera'>
				<div id='map' style={{ transform: transformMap, width: `${tileSize * levels[currentLevel].board[0].length}px` }}>
					{levels[currentLevel].board.map((row, i) => (
						<div key={i} className='row' style={{ height: `${tileSize}px` }}>
							{row.map((tile, j) => TileFactory(tile, j, i, tileSize))}
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
