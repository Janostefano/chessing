import React, {useState} from 'react'
import Square from './Square'
import _ from 'lodash'

function isEven(number) {

    return number % 2 === 0;
}

function calculateSquareColor(row, orderInRow) {
    if ((isEven(row) && isEven(orderInRow)) || (!isEven(row) && !isEven(orderInRow))) {
        return "white-square"
    } else return "black-square";
}

function Board(props) {
    let initialState = renderSquares();

    const [squares, setSquares] = useState(initialState);


    function renderSquares() {
        let indexCount = 0;
        let rows = [];
        for (let rank = 0; rank < 8; rank++) {
            let row = [];
            for (let file = 0; file < 8; file++) {
                const squareColor = (calculateSquareColor(rank, file));
                let id = rank * 8 + file;
                let doesMatch = typeof props.pieces[indexCount] != "undefined" && props.pieces[indexCount]["squareId"] === id;
                row.push(<Square key={id} id={id} color={squareColor} highlight={highlightPossibleMoves}
                                 pieceName={doesMatch ? props.pieces[indexCount].name : null}
                                 player={doesMatch ? props.pieces[indexCount].player : null}/>);
                if (typeof props.pieces[indexCount] != "undefined" && props.pieces[indexCount]["squareId"] === id) {
                    indexCount++;
                }

            }
            rows.push(row)
        }
        return rows
    }


    function highlightPossibleMoves(squareId, pieceName, player) {
        let newBoard = _.cloneDeep(squares);
        newBoard[Math.floor(squareId / 8)][squareId - 8 * Math.floor(Math.floor(squareId / 8))] =
            <Square key={squareId}
                    id={squareId}
                    color="clicked"
                    highlight={highlightPossibleMoves}
                    pieceName={pieceName}
                    player={player}/>;
        let possibleMoves = [];
        switch (pieceName) {
            case "king":
                possibleMoves = [-9, -8, -7, -1, 7, 8, 9, 1];
                const borderRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48, 55, 56, 57, 58, 59, 60, 61, 62, 63];
                if (borderRows.includes(squareId)) {
                    if (squareId === 0) {
                        possibleMoves = [1, 8, 9]
                    } else if (squareId === 7) {
                        possibleMoves = [-1, 7, 8]
                    } else if (squareId === 56) {
                        possibleMoves = [1, -7, -8]
                    } else if (squareId === 63) {
                        possibleMoves = [-1, -8, -9]
                    } else if ((squareId + 1) % 8 === 0) {
                        possibleMoves = [-9, -8, -1, 7, 8]
                    } else if (squareId % 8 === 0) {
                        possibleMoves = [-8, -7, 1, 8, 9]
                    } else if (squareId > 55) {
                        possibleMoves = [-9, -8, -7, -1, 1]
                    } else if (squareId < 8) {
                        possibleMoves = [-1, 1, 7, 8, 9]
                    } else {
                        possibleMoves = []
                    }
                }
                break;
            case "pawn":
                if (player === 1) {
                    possibleMoves = [8];
                    if (squareId > 7 && squareId < 16) {
                        possibleMoves = [8, 16]
                    }
                } else if (player === 2) {
                    possibleMoves = [-8];
                    if (squareId > 47 && squareId < 56) {
                        possibleMoves = [-8, -16]
                    }
                }
                break;
            default:
                console.log("these piece is not added yet");
        }
        possibleMoves.forEach(function (number) {
            const squareRow = Math.floor((squareId + number) / 8);
            const orderInRow = ((squareId + number) - 8 * Math.floor(squareRow));
            newBoard[squareRow][orderInRow] =
                <Square key={squareId + number} id={squareId + number} color="highlighted"
                        highlight={highlightPossibleMoves}
                        pieceName={squares[squareRow][orderInRow]["props"]["pieceName"]}
                        player={squares[squareRow][orderInRow]["props"]["player"]}/>
        });
        //showing possible captures
        if (pieceName === "pawn") {
            possibleMoves = [];
            if (player === 1) {
                if (squareId % 8 === 0) {
                    possibleMoves.push(9)
                } else if (squareId === 7 || (squareId + 1 % 8) === 0) {
                    possibleMoves.push(7)
                } else {
                    possibleMoves.push(7, 9);
                }
                possibleMoves = possibleMoves.filter((move) => move !== 8 || move !== 16)
            } else {
                if (squareId % 8 === 0) {
                    possibleMoves.push(-7)
                } else if ((squareId + 1 % 8) === 0) {
                    possibleMoves.push(-9)
                } else {
                    possibleMoves.push(-7, -9)
                }
                possibleMoves = possibleMoves.filter((move) => move !== -8 && move !== -16);
            }
        }
        possibleMoves.forEach(function (move) {
            let squareRow = Math.floor((squareId + move) / 8);
            let orderInRow = ((squareId + move) - 8 * Math.floor(squareRow));
            let square = newBoard[squareRow][orderInRow];
            if (square["props"]["pieceName"] != null && square["props"]["player"] !== player) {
                newBoard[squareRow][orderInRow] =
                    <Square key={squareId + move} id={squareId + move} color="to-capture"
                            highlight={highlightPossibleMoves}
                            pieceName={square["props"]["pieceName"]}
                            player={square["props"]["player"]}/>
            } else if (square["props"]["pieceName"] != null && square["props"]["player"] === player) {
                newBoard[squareRow][orderInRow] = <Square
                    key={squareId + move} id={squareId + move}
                    highlight={highlightPossibleMoves}
                    color={calculateSquareColor(squareRow, orderInRow)}
                    pieceName={square["props"]["pieceName"]}
                    player={square["props"]["player"]}/>
            }
        });
        setSquares(newBoard);
        return possibleMoves;
    }


    return <div className="board">{squares}</div>
}


export default Board;