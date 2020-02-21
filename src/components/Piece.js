import React from 'react'


function Piece(props) {
    const images = {
        king: {image: (props.isWhite ? "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png" : "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png")},
        queen: {image: (props.isWhite ? "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png" : "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png")},
        rook: {image: (props.isWhite ? "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png" : "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png")},
        bishop: {image: (props.isWhite ? "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png" : "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png")},
        knight: {image: (props.isWhite ? "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png" : "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png")},
        pawn: {image: (props.isWhite ? "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png" : "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png")},
        null: {image: null}
    };

    return <img className="chess-icon" src={images[props.name].image} alt={props.name}/>
}

export default Piece;