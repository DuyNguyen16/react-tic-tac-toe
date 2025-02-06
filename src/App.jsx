import { useState, useEffect } from "react";

function App() {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [turn, setTurn] = useState('X');
    const [isWinner, setIsWinner] = useState(false);
    const [winner, setWinner] = useState("");


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
                    >
                        <p className="text-[4rem]">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
