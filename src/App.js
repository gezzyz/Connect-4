import {useState} from 'react';

function Square({value, onSquareClick}){
    return <button className="square" onClick = {onSquareClick}>{value}</button>;
}
export default function Grid(){

    const numberOfRows = 6;
    const numberOfSquares = 7;

    const[squares, setSquares] = useState(Array(numberOfRows * numberOfSquares).fill(null));

    const[lastSquare, setLastSquare] = useState(true);

    function handleClick(i){

        if(squares[i] || calculateWinner(squares)){
            return;
        }

        const nextSquare = squares.slice();

        if(lastSquare){
            nextSquare[i] = 'X';
        }
        else{
            nextSquare[i] = 'O';
        }
        setLastSquare(!lastSquare);
        setSquares(nextSquare);

    }
    const winner = calculateWinner(squares);
    let status;

    if(winner){
        status = "Winner " + winner;
    }
    else{
        status = "Next Player " + (lastSquare ? 'X' : "O");
    }


    return (
        <>
        <div className='status'>{status}</div>
        {[...Array(numberOfRows)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid-row">
                {[...Array(numberOfSquares)].map((_, squareIndex) => {
                    const index = rowIndex * numberOfSquares + squareIndex;
                    return (
                        <Square
                            key={index}
                            value={squares[index]}
                            onSquareClick={() => handleClick(index)}
                        />
                    );
                })}
            </div>
        ))}
    </>
    );
}

function calculateWinner(squares) {
    const rows = 6;
    const columns = 7;

    // Check horizontal win
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col <= columns - 4; col++) {
            const index = row * columns + col;
            if (
                squares[index] &&
                squares[index] === squares[index + 1] &&
                squares[index] === squares[index + 2] &&
                squares[index] === squares[index + 3]
            ) {
                return squares[index];
            }
        }
    }

    // Check vertical win
    for (let col = 0; col < columns; col++) {
        for (let row = 0; row <= rows - 4; row++) {
            const index = row * columns + col;
            if (
                squares[index] &&
                squares[index] === squares[index + columns] &&
                squares[index] === squares[index + 2 * columns] &&
                squares[index] === squares[index + 3 * columns]
            ) {
                return squares[index];
            }
        }
    }

    // Check diagonal (top-left to bottom-right)
    for (let row = 0; row <= rows - 4; row++) {
        for (let col = 0; col <= columns - 4; col++) {
            const index = row * columns + col;
            if (
                squares[index] &&
                squares[index] === squares[index + columns + 1] &&
                squares[index] === squares[index + 2 * (columns + 1)] &&
                squares[index] === squares[index + 3 * (columns + 1)]
            ) {
                return squares[index];
            }
        }
    }

    // Check diagonal (top-right to bottom-left)
    for (let row = 0; row <= rows - 4; row++) {
        for (let col = 3; col < columns; col++) {
            const index = row * columns + col;
            if (
                squares[index] &&
                squares[index] === squares[index + columns - 1] &&
                squares[index] === squares[index + 2 * (columns - 1)] &&
                squares[index] === squares[index + 3 * (columns - 1)]
            ) {
                return squares[index];
            }
        }
    }

    // No winner found
    return null;
}