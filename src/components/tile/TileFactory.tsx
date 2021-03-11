import { ETileTypes } from '../../data/maps/IMap';
import './tiles.css';

/** Makes an element representing some tile. */
export const TileFactory = (tileType: ETileTypes, x: number, y: number, tileSize: number) => {
	const showCoords = false;

	// Initialization values
	const key = `${x},${y}`;
	const style = { width: `${tileSize}px`, height: `${tileSize}px` };

	switch (tileType) {
		case ETileTypes.standard:
			return (
				<div style={style} className='standard' key={key}>
					{showCoords && key}
				</div>
			);
		case ETileTypes.box:
			return (
				<div style={style} className='box' key={key}>
					{showCoords && key}
				</div>
			);
		case ETileTypes.portal:
			return (
				<div style={style} className='portal' key={key}>
					{showCoords && key}
				</div>
			);
		default:
			return (
				<div style={style} className='standard' key={key}>
					{showCoords && key}
				</div>
			);
	}
};
