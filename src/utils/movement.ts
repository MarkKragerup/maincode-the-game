import { ETileTypes, idToTile, IMap, levels } from '../data/maps/IMap';

export type IPosition = { x: number; y: number };

// Tile logic
export const tileSize = 50;
export const stepsPerTile = 1;
export const stepSize = 1 / stepsPerTile;

export const charTileSizeRatio = 2;
export const charOffSetTiles = 5 * tileSize;

//start in the middle of the map
const camera_offset = 250;

let x = camera_offset;
let y = camera_offset;

const held_directions: any[] = []; // State of which arrow keys we are holding down
const speed = 5; // How fast the character moves in pixels per frame

// @Returns new translates for moving the character and the map.
export const moveCharacter = (currentLevel: number, char?: HTMLElement, map?: HTMLElement) => {
	const held_direction = held_directions[0];

	const nextMove = { x: x, y: y };

	if (held_direction) {
		if (held_direction === directions.right) nextMove.x += speed;
		if (held_direction === directions.left) nextMove.x -= speed;
		if (held_direction === directions.down) nextMove.y += speed;
		if (held_direction === directions.up) nextMove.y -= speed;

		console.log(isValidMove(levels[currentLevel], nextMove));

		if (true) {
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
	var dir = keys[e.which];
	if (dir && held_directions.indexOf(dir) === -1) {
		held_directions.unshift(dir);
	}
});

document.addEventListener('keyup', (e) => {
	var dir = keys[e.which];
	var index = held_directions.indexOf(dir);
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
	// There is a boundary for both next left and right tile, since the char can be bigger than 1 tile.
	//const nextRightTile = map?.[Math.ceil(nextMove.y + charTileSizeRatio / 2)]?.[Math.floor(nextMove.x + charTileSizeRatio / 2)];
	//const nextLeftTile = map?.[Math.floor(nextMove.y + charTileSizeRatio / 2)]?.[Math.floor(nextMove.x)];

	const nextTile = map?.[nextMove.y]?.[nextMove.x];

	const isInsideMap = nextTile !== undefined;
	const isValidTile = idToTile.get(nextTile) !== ETileTypes.box && idToTile.get(nextTile) !== ETileTypes.box;

	console.log({ nextMove: nextMove, nextTile: x, isInsideMap: isInsideMap });

	return isInsideMap && isValidTile;
};
