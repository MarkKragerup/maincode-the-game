import {IPosition} from "../App";
import {ETileTypes, idToTile, IMap} from '../data/maps/IMap';

export const isValidMove = (map: IMap, currentPos: IPosition, move: string) => {
    switch (move) {
        case 'w':
            return (isInsideMap(map, currentPos, 'w') && isValidTile(map, currentPos, move));

        case 's':
            return (isInsideMap(map, currentPos, 's') && isValidTile(map, currentPos, move))

        case 'a':
            return (isInsideMap(map, currentPos, 'a') && isValidTile(map, currentPos, move));

        case 'd':
            return (isInsideMap(map, currentPos, 'd') && isValidTile(map, currentPos, move));

        default:
            return false;
    }
}

export const isInsideMap = (map: IMap, currentPos: IPosition, move: string) => {
    const nextPoint = getNextPoint(currentPos, move);
    return isValidPoint(map, nextPoint );
}

export const isValidPoint = (map: IMap, nextPoint: IPosition) => {
    if (nextPoint.x < 0 || nextPoint.y < 0) return false;
    return nextPoint.x < map.length && nextPoint.y < map?.[nextPoint.x]?.length;
}

export const getNextPoint = (currentPos: IPosition, move: string) => {
    let nextPoint: IPosition;

    switch (move) {
        case 'w':
            return nextPoint = {x: currentPos.x, y: currentPos.y - 1};

        case 's':
            return nextPoint = {x: currentPos.x, y: currentPos.y + 1};

        case 'a':
            return nextPoint = {x: currentPos.x - 1, y: currentPos.y};

        case 'd':
            return nextPoint = {x: currentPos.x + 1, y: currentPos.y};

        default:
            return nextPoint = {x: 0, y: 0};
    }
}

export const isValidTile = (map: IMap, currentPos: IPosition, move: string) => {
    const nextPoint = getNextPoint(currentPos, move);
    const isValid = isValidPoint(map, nextPoint);
    if (!isValid) return false;
    const tileTypeId = map[nextPoint.y][nextPoint.x];
    const tileType = idToTile.get(tileTypeId);
    return tileType === ETileTypes.standard || tileType === ETileTypes.door;
}