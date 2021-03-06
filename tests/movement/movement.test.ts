import {isValidMove} from "../../src/utils/movement";
import {entrance} from "../../src/data/maps/map";

describe('Testing movement logic on map 1', () => {
    it('isValidMove - invalid cases',  () =>  {
        expect(isValidMove(entrance,{ x: 0, y: 0 },'w')).toBeFalsy();
        expect(isValidMove(entrance,{ x: 0, y: 0 },'a')).toBeFalsy();
        expect(isValidMove(entrance,{ x: 1, y: 0 },'w')).toBeFalsy();
        expect(isValidMove(entrance,{ x: 0, y: 2 },'d')).toBeFalsy();
        expect(isValidMove(entrance,{ x: 1, y: 2 },'d')).toBeFalsy();
        expect(isValidMove(entrance,{ x: 2, y: 2 },'d')).toBeFalsy();
    });

    it('isValidMove - positive cases', () => {
        expect(isValidMove(entrance,{ x: 0, y: 0 },'s')).toBeTruthy();
        expect(isValidMove(entrance,{ x: 0, y: 0 },'d')).toBeTruthy();
        expect(isValidMove(entrance,{ x: 1, y: 0 },'s')).toBeTruthy();

        expect(isValidMove(entrance,{ x: 1, y: 1 },'w')).toBeTruthy();
        expect(isValidMove(entrance,{ x: 1, y: 1 },'a')).toBeTruthy();
        expect(isValidMove(entrance,{ x: 1, y: 1 },'s')).toBeTruthy();
        expect(isValidMove(entrance,{ x: 1, y: 1 },'d')).toBeTruthy();
    });
})