import {IPosition} from "../App";
import {ETileTypes, idToTile, IMap} from '../data/maps/IMap';

export const isValidMove = (map: IMap, nextMove: IPosition) => isInsideMap(map, nextMove) && isValidTile(map, nextMove);

export const isInsideMap = (map: IMap, position: IPosition): boolean => map?.[position.x]?.[position.y] !== undefined;

export const isValidTile = (map: IMap, nextMove: IPosition) => {
    const tileTypeId = map?.[nextMove.y]?.[nextMove.x];
    const tileType = idToTile.get(tileTypeId);
    return tileType === ETileTypes.standard || tileType === ETileTypes.door;
}