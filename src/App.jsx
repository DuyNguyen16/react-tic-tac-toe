import { useState, useEffect } from "react";

function App() {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [turn, setTurn] = useState('X');
    const [isWinner, setIsWinner] = useState(false);
    const [winner, setWinner] = useState("");

    const handleOnClick = (index) => {
        playerMove(index)
    }

    const playerMove = (index) => {
        const tempBoard = [...board]
        tempBoard[index] = 'O'
        setBoard(() => tempBoard)
        setTurn('X')
    }

    const checkWinner = (gameBoard) => {
        if (!gameBoard.includes('')) {
            return 'Y'
        }

        // horizontal win
        if (gameBoard[0] == gameBoard[1] && gameBoard[1] === gameBoard[2] && gameBoard[0] != '') {
            return gameBoard[0]
        } else if (gameBoard[3] == gameBoard[4] && gameBoard[4] === gameBoard[5] && gameBoard[3] != '') {
            return gameBoard[3]
        } else if (gameBoard[6] == gameBoard[7] && gameBoard[7] === gameBoard[8] && gameBoard[6] != '') {
            return gameBoard[6]
        }

        // vertical win
        if (gameBoard[0] == gameBoard[3] && gameBoard[3] === gameBoard[6] && gameBoard[0] != '') {
            return gameBoard[0]
        } else if (gameBoard[1] == gameBoard[4] && gameBoard[4] === gameBoard[7] && gameBoard[1] != '') {
            return gameBoard[1]
        } else if (gameBoard[2] == gameBoard[5] && gameBoard[5] === gameBoard[8] && gameBoard[2] != '') {
            return gameBoard[2]
        }

        // diagnal win 
        if (gameBoard[0] == gameBoard[4] && gameBoard[4] === gameBoard[8] && gameBoard[0] != '') {
            return gameBoard[0]
        } else if (gameBoard[2] == gameBoard[4] && gameBoard[4] === gameBoard[6] && gameBoard[2] != '') {
            return gameBoard[2]
        }
    }

    // Use useEffect to automatically call AI after player makes a move
    useEffect(() => {
        const win = checkWinner(board)
        if (!win) {
            return
        }
    }, [board]); // Dependencies to trigger AI after player's move

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
