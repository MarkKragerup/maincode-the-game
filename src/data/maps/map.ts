export type map = number[][];

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

export const entrance: map = [
  [1, 1, 3],
  [2, 1, 1],
  [1, 1, 1]
];