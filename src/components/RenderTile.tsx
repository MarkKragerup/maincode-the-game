import {ETileTypes, idToTile} from "../data/maps/IMap";
import './tiles.css';

export const RenderTile = (tileTypeId: number, x:number, y: number, tileSize: number) => {
    const tileType = idToTile.get(tileTypeId);
    const style = {
        width: `${tileSize}px`,
        height: `${tileSize}px`
    }

    switch (tileType) {
        case ETileTypes.standard:
            return <div style={style} className='standard'>{x} , {y}</div>
        case ETileTypes.box:
            return <div style={style} className='box'>{x} , {y}</div>
        case ETileTypes.door:
            return <div style={style} className='door'>{x} , {y}</div>
        default:
            return <div style={style} className='standard'>{x} , {y}</div>
    }
}