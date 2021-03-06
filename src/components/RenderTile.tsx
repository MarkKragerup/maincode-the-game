import {ETileTypes, idToTile} from "../data/maps/IMap";
import './tiles.css';

export const RenderTile = (tileTypeId: number, x:number, y: number) => {
    const tileType = idToTile.get(tileTypeId);

    switch (tileType) {
        case ETileTypes.standard:
            return <div className='standard tileSize'>{x} , {y}</div>
        case ETileTypes.box:
            return <div className='box tileSize'>{x} , {y}</div>
        case ETileTypes.door:
            return <div className='door tileSize'>{x} , {y}</div>
        default:
            return <div className='standard tileSize'>{x} , {y}</div>
    }
}