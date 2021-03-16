import { CSSProperties } from 'react';
import './tiles.css';

export enum ETileTypes {
	standard = 0,
	wall = 1,
	portal = 2
}

type ITileGenerator = (key: string, style: CSSProperties) => JSX.Element;

/** Makes an element representing some tile. */
export const TileFactory = (tileType: ETileTypes, x: number, y: number, tileSize: number): JSX.Element => {
	// Initialization values
	const key = `${x},${y}`;
	const style = { width: `${tileSize}px`, height: `${tileSize}px` };

	// Map of tile types and their generators.
	const TileGeneratorsMap = new Map<ETileTypes, JSX.Element>([
		[ETileTypes.wall, makeWallTile(key, style)],
		[ETileTypes.portal, makePortalTile(key, style)]
	]);

	return TileGeneratorsMap.get(tileType) ?? makeBasicTile(key, style);
};

const makeBasicTile: ITileGenerator = (key, style) => <div key={key} style={style} className='standard-tile' />;

const makeWallTile: ITileGenerator = (key, style) => (
	<div key={key} style={style} className='standard-tile'>
		<div className='wall-tile full-size' />
	</div>
);

const makePortalTile: ITileGenerator = (key, style) => (
	<div key={key} style={{ ...style, zIndex: 1 }} className='standard-tile'>
		<div className='portal-tile full-size' />
	</div>
);
