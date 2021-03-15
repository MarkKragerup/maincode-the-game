import { IMap, levels } from '../../data/maps/IMap';
import { ETileTypes } from '../tile/TileFactory';
import { EFaceDirection } from './GameEngine';
import { Dispatch } from 'react';

export type IPosition = { x: number; y: number };

// Tile logic
export const tileSize = 120;
export const charTileSizeRatio = 1.4;
export const charSize = tileSize * charTileSizeRatio;

// start in the middle of the map
const dim = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;

const camera_offset = dim / 2 - (tileSize * charTileSizeRatio) / 2;

let x = camera_offset;
let y = camera_offset;

export const held_directions: any[] = []; // State of which arrow keys we are holding down
const speed = 7; // How fast the character moves in pixels per frame

/** Moves the character and the map by transforming it. */
export const moveCharacter = (currentLevel: number, setDirection: Dispatch<any>, char?: HTMLElement, map?: HTMLElement) => {
	const held_direction = held_directions[0];

	if (!held_direction) {
		/* Remove walking className */
		if (char) char.classList.remove('walking');
	} else {
		/* Add walking className */
		if (char) char.classList.add('walking');
		setDirection(held_direction);
	}

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
export const directions = {
	up: 'up',
	down: 'down',
	right: 'right',
	left: 'left'
};

const keys: Record<number, string> = {
	38: directions.up,
	37: directions.left,
	39: directions.right,
	40: directions.down
};

document.addEventListener('keydown', (e) => {
	const dir = keys[e.which];
	if (dir && held_directions.indexOf(dir) === -1) held_directions.unshift(dir);
});

document.addEventListener('keyup', (e) => {
	const dir = keys[e.which];
	const index = held_directions.indexOf(dir);
	if (index > -1) held_directions.splice(index, 1);
});

/** Sets up a persistent loop for the character movement animations. */
export const movementLoop = (currentLevel: number, setDirection: Dispatch<any>, char?: HTMLElement, map?: HTMLElement) => {
	moveCharacter(currentLevel, setDirection, char, map);
	window.requestAnimationFrame(() => movementLoop(currentLevel, setDirection, char, map));
};

const getTileForPos = (position: IPosition): IPosition => ({
	x: Math.floor(position.x / tileSize),
	y: Math.floor(position.y / tileSize)
});

/** Evaluate if a proposed move is valid and legal. */
export const isValidMove = (map: IMap, nextTL: IPosition): boolean => {
	// Calculate our standpoint q, which is the middle of the bottom line. Between the feet.
	const q: IPosition = { x: nextTL.x + charSize / 2, y: nextTL.y + charSize };

	/** Calculate the hit-box for within the ".character" div. The hit-box is smaller than the div. */
	const hitBoxTL: IPosition = { x: q.x - 0.45 * tileSize, y: q.y - 0.9 * tileSize };
	const hitBoxTR: IPosition = { x: q.x + 0.45 * tileSize, y: q.y - 0.9 * tileSize };
	const hitBoxBL: IPosition = { x: q.x - 0.45 * tileSize, y: q.y };
	const hitBoxBR: IPosition = { x: q.x + 0.45 * tileSize, y: q.y };

	// This array describes the hit-box corners
	const hitBoxCollisions: IPosition[] = [hitBoxTL, hitBoxTR, hitBoxBR, hitBoxBL].map((pos) => getTileForPos(pos));

	/** Check that the hit-box is inside the map (access is not undefined) and that it is a valid tile (tile type is not a wall). */
	const isInsideMap = hitBoxCollisions.every((pos) => map.board?.[pos.y]?.[pos.x] !== undefined);
	const isValidTile = hitBoxCollisions.every((pos) => map.board?.[pos.y]?.[pos.x] !== ETileTypes.wall);

	return isInsideMap && isValidTile;
};
