import React from 'react'
import Piece from './Piece'


function Square(props) {


    function handleClick(e) {
        e.preventDefault();
        props.highlight(props.id, props.pieceName, props.player);
    }


    return <div className={"square " + props.color} onClick={handleClick}>{props.pieceName != null ?
        <Piece name={props.pieceName} isWhite={props.player === 1}/> : null}</div>
}

export default Square;