import { ETileTypes, idToTile } from '../data/maps/IMap';
import './tiles.css';

export const RenderTile = (tileTypeId: number, x: number, y: number, tileSize: number) => {
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
					{key}
				</div>
			);
		case ETileTypes.box:
			return (
				<div style={style} className='box' key={key}>
					{key}
				</div>
			);
		case ETileTypes.door:
			return (
				<div style={style} className='door' key={key}>
					{key}
				</div>
			);
		default:
			return (
				<div style={style} className='standard' key={key}>
					{key}
				</div>
			);
	}
};
