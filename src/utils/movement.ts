import { ETileTypes, idToTile, IMap } from '../data/maps/IMap';

export type IPosition = { x: number; y: number };

export type ITransformCB = (translate: string) => void;

//start in the middle of the map
let x = 250;
let y = 250;
const held_directions: any[] = []; //State of which arrow keys we are holding down
const speed = 5; //How fast the character moves in pixels per frame

// @Returns new translates for moving the character and the map.
export const moveCharacter = (transformCharCB: ITransformCB, transformMapCB: ITransformCB) => {
	const held_direction = held_directions[0];
	if (held_direction) {
		if (held_direction === directions.right) {
			x += speed;
		}
		if (held_direction === directions.left) {
			x -= speed;
		}
		if (held_direction === directions.down) {
			y += speed;
		}
		if (held_direction === directions.up) {
			y -= speed;
		}
	}

	//Limits (gives the illusion of walls)
	const leftLimit = -8;
	const rightLimit = 16 * 11 + 8;
	const topLimit = -8 + 32;
	const bottomLimit = 16 * 7;
	if (x < leftLimit) {
		x = leftLimit;
	}
	if (x > rightLimit) {
		x = rightLimit;
	}
	if (y < topLimit) {
		y = topLimit;
	}
	if (y > bottomLimit) {
		y = bottomLimit;
	}

	const camera_offset = 250;

	transformMapCB(`translate3d( ${-x + camera_offset}px, ${-y + camera_offset}px, 0 )`);
	transformCharCB(`translate3d( ${x}px, ${y}px, 0 )`);
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
export const movementLoop = (transformCharCB: ITransformCB, transformMapCB: ITransformCB) => {
	moveCharacter(transformCharCB, transformMapCB);
	window.requestAnimationFrame(() => {
		movementLoop(transformCharCB, transformMapCB);
	});
};

export const isValidMove = (map: IMap, nextMove: IPosition, charTileSizeRatio: number): boolean => {
	// There is a boundary for both next left and right tile, since the char can be bigger than 1 tile.
	const nextRightTile = map?.[Math.ceil(nextMove.y + charTileSizeRatio / 2)]?.[Math.floor(nextMove.x + charTileSizeRatio / 2)];
	const nextLeftTile = map?.[Math.floor(nextMove.y + charTileSizeRatio / 2)]?.[Math.floor(nextMove.x)];

	console.log({ nextM: nextMove, charTileRat: charTileSizeRatio, nleft: nextLeftTile, nright: nextRightTile });

	let isInsideMap = nextRightTile !== undefined && nextLeftTile !== undefined;
	let isValidTile = idToTile.get(nextRightTile) !== ETileTypes.box && idToTile.get(nextLeftTile) !== ETileTypes.box;

	return isInsideMap && isValidTile;
};
