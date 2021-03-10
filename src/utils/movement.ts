import {IPosition} from "../GameEngine";
import {ETileTypes, idToTile, IMap} from '../data/maps/IMap';

export const isValidMove = (map: IMap, nextMove: IPosition, charTileSizeRatio: number): boolean => {

    // There is a boundary for both next left and right tile, since the char can be bigger than 1 tile.
    const nextRightTile = map?.[Math.ceil(nextMove.y + charTileSizeRatio / 2)]?.[Math.floor(nextMove.x + charTileSizeRatio / 2)]
    const nextLeftTile = map?.[Math.floor(nextMove.y + charTileSizeRatio / 2)]?.[Math.floor(nextMove.x)]

    console.log({nextM: nextMove, charTileRat: charTileSizeRatio, nleft: nextLeftTile, nright: nextRightTile})


    let isInsideMap = nextRightTile !== undefined &&  nextLeftTile !== undefined;
    let isValidTile = idToTile.get(nextRightTile) !== ETileTypes.box && idToTile.get(nextLeftTile) !== ETileTypes.box;

    return isInsideMap && isValidTile;
}