import { IMap, levels } from '../data/maps/IMap';
import { ETileTypes } from '../components/tile/TileFactory';

export type IPosition = { x: number; y: number };

// Tile logic
export const tileSize = 50;

export const charTileSizeRatio = 1.6;

// start in the middle of the map
const dim = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;

const camera_offset = dim / 2 - (tileSize * charTileSizeRatio) / 2;

let x = camera_offset;
let y = camera_offset;

const held_directions: any[] = []; // State of which arrow keys we are holding down
const speed = 5; // How fast the character moves in pixels per frame

/** Moves the character and the map by transforming it. */
export const moveCharacter = (currentLevel: number, char?: HTMLElement, map?: HTMLElement) => {
	const held_direction = held_directions[0];

	const nextMove = { x: x, y: y };

	if (held_direction) {
		if (held_direction === directions.right) nextMove.x += speed;
		if (held_direction === directions.left) nextMove.x -= speed;
		if (held_direction === directions.down) nextMove.y += speed;
		if (held_direction === directions.up) nextMove.y -= speed;

		if (isValidMove(levels[currentLevel], nextMove)) {
			x = nextMove.x;
			y = nextMove.y;
		} else return;
	}

	if (!!char && !!map) {
		map.style.transform = `translate3d( ${-x + camera_offset}px, ${-y + camera_offset}px, 0 )`;
		char.style.transform = `translate3d( ${x}px, ${y}px, 0 )`;
	}
};

/* Direction key state */
const directions = {
	up: 'up',
	down: 'down',
	left: 'left',
	right: 'right'
};

const keys: Record<number, string> = {
	38: directions.up,
	37: directions.left,
	39: directions.right,
	40: directions.down
};

document.addEventListener('keydown', (e) => {
	const dir = keys[e.which];
	if (dir && held_directions.indexOf(dir) === -1) {
		held_directions.unshift(dir);
	}
});

document.addEventListener('keyup', (e) => {
	const dir = keys[e.which];
	const index = held_directions.indexOf(dir);
	if (index > -1) {
		held_directions.splice(index, 1);
	}
});

/** Sets up a persistent loop for the character movement animations. */
export const movementLoop = (currentLevel: number, char?: HTMLElement, map?: HTMLElement) => {
	moveCharacter(currentLevel, char, map);
	window.requestAnimationFrame(() => {
		movementLoop(currentLevel, char, map);
	});
};

export const isValidMove = (map: IMap, nextMove: IPosition): boolean => {
	/** Calculate next top tile*/
	const nextTopX = Math.floor(nextMove.x / tileSize);
	const nextTopY = Math.floor(nextMove.y / tileSize) + 1; // Offset +1 because we want to extend outside the map in the TOP on the Y axis.
	const nextTopTile = map.board?.[nextTopY]?.[nextTopX];

	/**
	 * Calculate next bottom tile.
	 * Offsets because we match on the bottom and right sides - which are the final spaces in the array and can't be accessed when ceiling/flooring.
	 */
	const nextBottomX = Math.ceil(nextMove.x / tileSize + charTileSizeRatio) - 1;
	const nextBottomY = Math.ceil(nextMove.y / tileSize + charTileSizeRatio) - 1;
	const nextBottomTile = map.board?.[nextBottomY]?.[nextBottomX];

	// Next tiles are within the array and of accessible types.
	const isInsideMap = nextTopTile !== undefined && nextBottomTile !== undefined;
	const isValidTile = nextTopTile !== ETileTypes.wall && nextBottomTile !== ETileTypes.wall;

	return isInsideMap && isValidTile;
};