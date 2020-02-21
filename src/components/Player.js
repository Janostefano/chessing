import React from 'react';

function Player(props) {

    const figures = {
        pawns: {
            image: (props.isWhite ? "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png" : "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png"),
            count: props.captured.pawn
        },
        knights: {
            image: (props.isWhite ? "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png" : "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png"),
            count: props.captured.knight
        },
        bishops: {
            image: (props.isWhite ? "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png" : "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png"),
            count: props.captured.bishop
        },
        rooks: {
            image: (props.isWhite ? "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png" : "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png"),
            count: props.captured.rook
        },
        queen: {
            image: (props.isWhite ? "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png" : "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png"),
            count: props.captured.queen
        }
    };


    function getFigures() {
        let figs = [];
        let figsCount = [];
        for (let key in figures) {
            figs.push(<th key={key}><img src={figures[key].image} alt="piece"/></th>);
            figsCount.push(<td key={key}>{figures[key].count}</td>);
        }
        return <table className="score-table">
            <thead>
            <tr>{figs}</tr>
            </thead>
            <tbody>
            <tr>{figsCount}</tr>
            </tbody>
        </table>
    }

    return <div>
        <h1>{props.name}</h1>
        {getFigures()}
    </div>
}

export default Player;