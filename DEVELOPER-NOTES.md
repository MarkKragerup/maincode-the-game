# Notes from/to the developers

## The boundary:
- Hold 4 states for each of the 4 collision tiles
- On each proposed move, check if the collision goes outside the map or hits an illigal tile
- If we pad the maps, we don't need to check map boundary