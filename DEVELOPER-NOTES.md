# Notes from/to the developers

## The map look:
Pad the map array with more tiles! just give it 50x walls os outer padding in all directions.
This can be a helper. We also need maps to have a starting point. Perhaps map should be a type which has a 2D array and a starting point?

## The tiles look:
Tiles can have multiple DIV's - dets always have the default background, then something else on top.
Then we won't "shine-through" to the map.

## The boundary:
- Hold 4 states for each of the 4 collision tiles
- On each proposed move, check if the collision goes outside the map or hits an illigal tile
- If we pad the maps, we don't need to check map boundary