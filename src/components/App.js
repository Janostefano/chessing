import React from 'react';
import '../styles.css';
import Player from "./Player"
import Board from "./Board"

function App() {

    //board state information will be received from backend
    // it has to be ordered to render properly (sorted by squareId)
    let boardState = [{squareId: 0, name: "rook", player: 1},
        {squareId: 1, name: "knight", player: 1},
        {squareId: 2, name: "bishop", player: 1},
        {squareId: 3, name: "queen", player: 1},
        {squareId: 4, name: "king", player: 1},
        {squareId: 5, name: "bishop", player: 1},
        {squareId: 6, name: "knight", player: 1},
        {squareId: 7, name: "rook", player: 1},
        {squareId: 8, name: "pawn", player: 1},
        {squareId: 9, name: "pawn", player: 1},
        {squareId: 10, name: "pawn", player: 1},
        {squareId: 11, name: "pawn", player: 1},
        {squareId: 12, name: "pawn", player: 1},
        {squareId: 13, name: "pawn", player: 1},
        {squareId: 14, name: "pawn", player: 1},
        {squareId: 15, name: "pawn", player: 1},
        {squareId: 48, name: "pawn", player: 2},
        {squareId: 49, name: "pawn", player: 2},
        {squareId: 50, name: "pawn", player: 2},
        {squareId: 51, name: "pawn", player: 2},
        {squareId: 52, name: "pawn", player: 2},
        {squareId: 53, name: "pawn", player: 2},
        {squareId: 54, name: "pawn", player: 2},
        {squareId: 55, name: "pawn", player: 2},
        {squareId: 56, name: "rook", player: 2},
        {squareId: 57, name: "knight", player: 2},
        {squareId: 58, name: "bishop", player: 2},
        {squareId: 59, name: "queen", player: 2},
        {squareId: 60, name: "king", player: 2},
        {squareId: 61, name: "bishop", player: 2},
        {squareId: 62, name: "knight", player: 2},
        {squareId: 63, name: "rook", player: 2}];


    let capturedPieces = {pawn: 0, knight: 0, bishop: 0, rook: 0, queen: 0};


    return (
        <div className="container">
            <div>
                <div className="row">
                    <div className= "col-md">
                        <Board pieces={boardState}/>
                    </div>
                    <div className="player-frame col-md">
                        <Player name="Player 1" isWhite={true} captured={capturedPieces}/>
                        <Player name="Player 2" isWhite={false} captured={capturedPieces}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
