import React, { useState, useEffect } from 'react';
import './game-engine.css';
import { levels } from '../../data/maps/IMap';
import { movementLoop, tileSize } from './movement-engine';
import { TileFactory } from '../tile/TileFactory';
import avatar_down from '../../assets/illustrations/avatar/avatar-down.svg';
import sprite_sheet from '../../assets/illustrations/avatar_sprite_v1.svg';

export enum EFaceDirection {
	up = 'up',
	down = 'down',
	right = 'right',
	left = 'left'
}

const directionMap = new Map<EFaceDirection, string>([
	[EFaceDirection.down, 'face-down'],
	[EFaceDirection.up, 'face-up'],
	[EFaceDirection.left, 'face-left'],
	[EFaceDirection.right, 'face-right']
]);

const GameEngine = () => {
	const [currentLevel, setCurrentLevel] = useState<number>(0);

	const [faceDirection, setFaceDirection] = useState<EFaceDirection>(EFaceDirection.down);
	const [avatar, setAvatar] = useState(directionMap.get(EFaceDirection.down));

	/** Setup the movement for the elements */
	useEffect(() => movementLoop(currentLevel, setFaceDirection, document.getElementById('character') ?? undefined, document.getElementById('map') ?? undefined), [currentLevel]);

	useEffect(() => {
		const nextAvatar = directionMap.get(faceDirection) ?? avatar_down;
		if (avatar !== nextAvatar) setAvatar(nextAvatar);
	}, [avatar, faceDirection]);

	console.log('re-rendered the app.. very heavy on performance.');

	return (
		<div id='frame'>
			<div id='camera'>
				<div id='map' style={{ width: `${tileSize * levels[currentLevel].board[0].length}px` }}>
					{levels[currentLevel].board.map((row, i) => (
						<div key={i} className='row' style={{ height: `${tileSize}px` }}>
							{row.map((tile, j) => TileFactory(tile, j, i, tileSize))}
						</div>
					))}
					<div id={'character'} className='walking' style={{ height: `${32*4}px`, width: `${32*4}px` }}>
						<img className={`character-spritesheet ${faceDirection}`} height={128*4} width={128*4}
								 src={sprite_sheet} alt="Character"/>
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
