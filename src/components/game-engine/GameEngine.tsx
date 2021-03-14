import React, { useState, useEffect } from 'react';
import './game-engine.css';
import { levels } from '../../data/maps/IMap';
import { charTileSizeRatio, held_directions, movementLoop, tileSize } from './movement-engine';
import { TileFactory } from '../tile/TileFactory';
import avatar_down from '../../assets/illustrations/avatar/avatar-down.svg';
import avatar_up from '../../assets/illustrations/avatar/avatar-up.svg';
import avatar_left from '../../assets/illustrations/avatar/avatar-left.svg';
import avatar_right from '../../assets/illustrations/avatar/avatar-right.svg';

export enum EFaceDirection {
	up = 'up',
	down = 'down',
	right = 'right',
	left = 'left'
}

const directionMap = new Map<EFaceDirection, string>([
	[EFaceDirection.down, avatar_down],
	[EFaceDirection.up, avatar_up],
	[EFaceDirection.left, avatar_left],
	[EFaceDirection.right, avatar_right]
]);

const GameEngine = () => {
	const [currentLevel, setCurrentLevel] = useState<number>(0);

	const [currentTile, setCurrentTile] = useState<{ column: number; row: number }>();
	const [faceDirection, setFaceDirection] = useState<EFaceDirection>(EFaceDirection.down);
	const [avatar, setAvatar] = useState(directionMap.get(EFaceDirection.down));

	const [transformMap, setTransformMap] = useState('');
	const [transformChar, setTransformChar] = useState('');

	/** Setup the movement for the elements */
	useEffect(() => movementLoop(currentLevel, document.getElementById('character') ?? undefined, document.getElementById('map') ?? undefined), [currentLevel]);

	useEffect(() => {
		setAvatar(directionMap.get(faceDirection));
	}, [faceDirection, setAvatar]);

	console.log('re-rendered the app.. very heavy on performance.');
	console.log(held_directions);

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
						<img src={avatar} alt='avatar' width={charTileSizeRatio * tileSize} height={charTileSizeRatio * tileSize} />
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
