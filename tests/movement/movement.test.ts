import {isValidMove} from "../../src/utils/movement";
import {entrance} from "../../src/data/maps/map";

describe('Testing movement', () => {
    it('testing is valid ',  () =>  {
        expect(isValidMove(entrance,{x: 1, y: 1},'w')).toBeTruthy();
    });
})