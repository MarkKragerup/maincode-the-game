import React from 'react';
import { isValidMove, isValidTile, isInsideMap, isValidPoint, getNextPoint } from './utils/movement-engine';
import { levels } from './data/maps/IMap';

const entrance = levels[0];

describe('Testing movement logic on map 1', () => {
	it('getNextPoint - positive cases', () => {
		expect(getNextPoint({ x: 0, y: 0 }, 'd').x === 1).toBeTruthy();
		expect(getNextPoint({ x: 0, y: 0 }, 'd').y === 0).toBeTruthy();

		expect(getNextPoint({ x: 1, y: 0 }, 'd').x === 2).toBeTruthy();
		expect(getNextPoint({ x: 1, y: 0 }, 'd').y === 0).toBeTruthy();
	});

	it('isValidPoint - positive cases', () => {
		expect(isValidPoint(entrance, { x: 0, y: 0 })).toBeTruthy();
		expect(isValidPoint(entrance, { x: 1, y: 0 })).toBeTruthy();
		expect(isValidPoint(entrance, { x: 2, y: 0 })).toBeTruthy();
		expect(isValidPoint(entrance, { x: 0, y: 1 })).toBeTruthy();
		expect(isValidPoint(entrance, { x: 1, y: 1 })).toBeTruthy();
		expect(isValidPoint(entrance, { x: 2, y: 1 })).toBeTruthy();
		expect(isValidPoint(entrance, { x: 0, y: 2 })).toBeTruthy();
		expect(isValidPoint(entrance, { x: 1, y: 2 })).toBeTruthy();
		expect(isValidPoint(entrance, { x: 2, y: 2 })).toBeTruthy();
	});

	it('isValidPoint - invalid cases', () => {
		expect(isValidPoint(entrance, { x: 3, y: 3 })).toBeFalsy();
		expect(isValidPoint(entrance, { x: 4, y: 4 })).toBeFalsy();
		expect(isValidPoint(entrance, { x: 99, y: 99 })).toBeFalsy();
	});

	it('isValidTile - positive cases', () => {
		expect(isValidTile(entrance, { x: 0, y: 0 }, 'd')).toBeTruthy();
		expect(isValidTile(entrance, { x: 1, y: 0 }, 's')).toBeTruthy();
		expect(isValidTile(entrance, { x: 1, y: 0 }, 'a')).toBeTruthy();
		expect(isValidTile(entrance, { x: 1, y: 1 }, 'w')).toBeTruthy();
		expect(isValidTile(entrance, { x: 1, y: 1 }, 'd')).toBeTruthy();
		expect(isValidTile(entrance, { x: 1, y: 1 }, 's')).toBeTruthy();
		expect(isValidTile(entrance, { x: 2, y: 1 }, 's')).toBeTruthy();
		expect(isValidTile(entrance, { x: 2, y: 1 }, 'a')).toBeTruthy();
		expect(isValidTile(entrance, { x: 0, y: 2 }, 'd')).toBeTruthy();
		expect(isValidTile(entrance, { x: 1, y: 2 }, 'w')).toBeTruthy();
		expect(isValidTile(entrance, { x: 1, y: 2 }, 'd')).toBeTruthy();
		expect(isValidTile(entrance, { x: 1, y: 2 }, 'a')).toBeTruthy();
		expect(isValidTile(entrance, { x: 2, y: 2 }, 'w')).toBeTruthy();
	});

	it('isValidTile - invalid cases ', () => {
		expect(isValidTile(entrance, { x: 0, y: 0 }, 's')).toBeFalsy();
		expect(isValidTile(entrance, { x: 1, y: 1 }, 'a')).toBeFalsy();
		expect(isValidTile(entrance, { x: 0, y: 2 }, 'w')).toBeFalsy();
		expect(isValidTile(entrance, { x: 1, y: 0 }, 'd')).toBeFalsy();
		expect(isValidTile(entrance, { x: 2, y: 1 }, 'w')).toBeFalsy();
	});

	it('isInsideMap - positive cases', () => {
		expect(isInsideMap(entrance, { x: 0, y: 0 }, 'd')).toBeTruthy();
		expect(isInsideMap(entrance, { x: 0, y: 0 }, 's')).toBeTruthy();
		expect(isInsideMap(entrance, { x: 1, y: 0 }, 'd')).toBeTruthy();
		expect(isInsideMap(entrance, { x: 1, y: 0 }, 's')).toBeTruthy();
		expect(isInsideMap(entrance, { x: 1, y: 0 }, 'a')).toBeTruthy();
		expect(isInsideMap(entrance, { x: 2, y: 0 }, 'a')).toBeTruthy();
		expect(isInsideMap(entrance, { x: 2, y: 0 }, 's')).toBeTruthy();
		expect(isInsideMap(entrance, { x: 0, y: 1 }, 'w')).toBeTruthy();
		expect(isInsideMap(entrance, { x: 0, y: 1 }, 's')).toBeTruthy();
		expect(isInsideMap(entrance, { x: 0, y: 1 }, 'd')).toBeTruthy();
		expect(isInsideMap(entrance, { x: 0, y: 2 }, 'd')).toBeTruthy();
		expect(isInsideMap(entrance, { x: 0, y: 2 }, 'w')).toBeTruthy();
	});

	it('isInsideMap - invalid cases', () => {
		expect(isInsideMap(entrance, { x: 0, y: 0 }, 'w')).toBeFalsy();
		expect(isInsideMap(entrance, { x: 0, y: 0 }, 'a')).toBeFalsy();
		expect(isInsideMap(entrance, { x: 1, y: 0 }, 'w')).toBeFalsy();
		expect(isInsideMap(entrance, { x: 2, y: 0 }, 'w')).toBeFalsy();
		expect(isInsideMap(entrance, { x: 2, y: 0 }, 'd')).toBeFalsy();
	});

	it('isValidMove - positive cases', () => {
		expect(isValidMove(entrance, { x: 1, y: 1 }, 'w')).toBeTruthy();
		expect(isValidMove(entrance, { x: 1, y: 1 }, 's')).toBeTruthy();
		expect(isValidMove(entrance, { x: 1, y: 1 }, 'd')).toBeTruthy();
		expect(isValidMove(entrance, { x: 0, y: 0 }, 'd')).toBeTruthy();
		expect(isValidMove(entrance, { x: 1, y: 0 }, 's')).toBeTruthy();
	});

	it('isValidMove - invalid cases', () => {
		expect(isValidMove(entrance, { x: 0, y: 0 }, 'w')).toBeFalsy();
		expect(isValidMove(entrance, { x: 0, y: 0 }, 'a')).toBeFalsy();
		expect(isValidMove(entrance, { x: 1, y: 0 }, 'w')).toBeFalsy();
		expect(isValidMove(entrance, { x: 2, y: 2 }, 'd')).toBeFalsy();
	});
});
