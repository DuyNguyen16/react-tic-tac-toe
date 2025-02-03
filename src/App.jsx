import { useState, useEffect } from "react";

function App() {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [turn, setTurn] = useState('X');
    const [isWinner, setIsWinner] = useState(false);
    const [winner, setWinner] = useState("");

    const handleOnClick = (index) => {
        if (board[index] !== "" || isWinner) return;  // Don't allow moves if there's a winner.
    
        const newBoard = [...board];
        if (turn === 'X') {
            play(index, newBoard);
            setTurn('O'); // Switch to AI's turn
        }
    };

    const play = (index, tempBoard) => {
        if (turn === 'X') {
            tempBoard[index] = turn;
        }

        rule(tempBoard);
        setBoard(tempBoard);
    };

    const rule = (board) => {
        if (
            (board[0] === board[1] && board[1] === board[2] && board[0] !== '') ||
            (board[3] === board[4] && board[4] === board[5] && board[3] !== '') ||
            (board[6] === board[7] && board[7] === board[8] && board[6] !== '') ||
            (board[0] === board[4] && board[4] === board[8] && board[0] !== '') ||
            (board[2] === board[4] && board[4] === board[6] && board[2] !== '') ||
            (board[0] === board[3] && board[3] === board[6] && board[0] !== '') ||
            (board[1] === board[4] && board[4] === board[7] && board[1] !== '') ||
            (board[2] === board[5] && board[5] === board[8] && board[2] !== '')
        ) {
            setIsWinner(true);
            setWinner(board[0]);
        }
    };

    const handleRestart = () => {
        setBoard(Array(9).fill(''));
        setIsWinner(false);
        setWinner("");
        setTurn('X'); // Reset turn as well
    };

    const AI = (board) => {
        const emptyCells = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                emptyCells.push(i);
            }
        }
        const random = Math.floor(Math.random() * emptyCells.length);
        board[emptyCells[random]] = 'O';  // AI plays 'O'
        setBoard([...board]);  // Update state with a new board
    };

    // Use useEffect to automatically call AI after player makes a move
    useEffect(() => {
        if (turn === 'O' && !isWinner) {  // If it's AI's turn and there's no winner yet
            AI([...board]);  // AI takes a turn
            setTurn('X');    // Switch back to player's turn
        }
    }, [board, turn, isWinner]); // Dependencies to trigger AI after player's move

    return (
        <div className="flex justify-center items-center min-h-screen">
            {isWinner ? (
                <div className="absolute bg-slate-300 w-[24rem] h-[10rem] flex justify-center items-center flex-col">
                    <p>Winner {winner}!</p>{" "}
                    <button
                        className="bg-blue-400 px-4 py-1 font-bold"
                        onClick={handleRestart}
                    >
                        restart
                    </button>
                </div>
            ) : (
                <></>
            )}
            <div className="grid grid-cols-3 gap-2 bg-black rounded-lg p-2">
                {board.map((value, index) => (
                    <div
                        key={index}
                        className="p-2 w-[7rem] h-[7rem] border bg-white text-center cursor-pointer"
                        onClick={() => handleOnClick(index)}
                    >
                        <p className="text-[4rem]">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
