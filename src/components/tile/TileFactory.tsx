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
	const size: CSSProperties = { width: `${tileSize}px`, height: `${tileSize}px`};

	// Map of tile types and their generators.
	const TileGeneratorsMap = new Map<ETileTypes, JSX.Element>([
		[ETileTypes.wall, makeWallTile(key, size)],
		[ETileTypes.portal, makePortalTile(key, size)]
	]);

	return TileGeneratorsMap.get(tileType) ?? makeBasicTile(key, size);
};

const makeBasicTile: ITileGenerator = (key, size) => <div key={key} style={size} className='standard-tile' />;

const makeWallTile: ITileGenerator = (key, size) => ( <div key={key} style={size} className='wall-tile full-size' /> );

const makePortalTile: ITileGenerator = (key, size) => (
	<div key={key} style={size} className='standard-tile'>
		<div className='portal-tile full-size' />
	</div>
);
