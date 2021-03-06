export type IMap = number[][];

export enum ETileTypes {
  standard = 'STANDARD',
  box = 'BOX',
  door = 'DOOR'
}

export const idToTile = new Map<number, ETileTypes>([
  [0, ETileTypes.standard],
  [1, ETileTypes.box],
  [2, ETileTypes.door],
]);

export const entrance: IMap = [
  [0, 0, 2],
  [1, 0, 0],
  [0, 0, 0]
];