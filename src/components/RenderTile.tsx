import { ETileTypes, idToTile } from '../data/maps/IMap';
import './tiles.css';

export const RenderTile = (tileTypeId: number, x: number, y: number, tileSize: number) => {
	const showCoords = false;

	const tileType = idToTile.get(tileTypeId);
	const style = {
		width: `${tileSize}px`,
		height: `${tileSize}px`
	};
	const key = `${x},${y}`;

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
