import { position } from "../App";
import {ETileTypes, idToTile, map, entrance} from '../data/maps/map';

export const isValidMove = (map: map, currentPos: position, move: string) => {
  switch (move) {
    case 'w':
      return !(isOutsideMap(map, currentPos, 'w') || isInvalidTile(map, currentPos, move));

    case 's':
      return !(isOutsideMap(map, currentPos, 's') || isInvalidTile(map, currentPos, move))

    case 'a':
      return !(isOutsideMap(map, currentPos, 'a') || isInvalidTile(map, currentPos, move));

    case 'd':
      return !(isOutsideMap(map, currentPos, 'd') || isInvalidTile(map, currentPos, move));

    default: return false;
  }
}

const isOutsideMap = (map: map, currentPos: position, move: string) => {
  const coord = destinedCoord(currentPos, move);
  if (isValidCoord(coord, map)) return false;
}

const isValidCoord = (destinedCoord: position, map: map) => {
  if (destinedCoord.x > map.length || destinedCoord.y > map?.[destinedCoord.y]?.length) return false;
}

const destinedCoord = (currentPos: position, move: string) => {
  let destinedCoord: position;

  switch (move) {
    case 'w':
      return destinedCoord = { x: currentPos.x, y: currentPos.y - 1 };

    case 's':
      return destinedCoord = { x: currentPos.x, y: currentPos.y + 1 };

    case 'a':
      return destinedCoord = { x: currentPos.x - 1 , y: currentPos.y };

    case 'd':
      return destinedCoord = { x: currentPos.x + 1, y: currentPos.y };

    default:
      return destinedCoord = { x: 0, y: 0 };
  }
}

const isInvalidTile = (map: map, currentPos: position, move: string) => {
  const coord = destinedCoord(currentPos, move);
  const isValid = isValidCoord(coord, map);
  if (!isValid) return true;
  const tileTypeId =  map[coord.x][coord.y];
  const tileType = idToTile.get(tileTypeId);

  return (tileType === ETileTypes.box || tileType === ETileTypes.door);
}