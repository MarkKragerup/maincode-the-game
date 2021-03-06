import React from 'react';
import {isValidMove} from "./utils/movement";
import {entrance} from "./data/maps/map";

describe('Testing movement', () => {
  it('testing is valid ',  () =>  {
    expect(isValidMove(entrance,{x: 1, y: 1},'w')).toBeFalsy();
  });
})