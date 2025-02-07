import { useState, useEffect } from "react";

function App() {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [turn, setTurn] = useState('O'); // Change this line so the player (O) goes first
    const [isWinner, setIsWinner] = useState(false);
    const [winner, setWinner] = useState("");

    const handleOnClick = (index) => {
        if (!isWinner) {
            playerMove(index)
        }
    }

    const playerMove = (index) => {
        if (board[index] == '') {
            const tempBoard = [...board]
            tempBoard[index] = 'O'
            setBoard(() => tempBoard)
            setTurn('X')
        }
    }

    const checkWinner = (gameBoard) => {

        // horizontal win
        if (gameBoard[0] == gameBoard[1] && gameBoard[1] === gameBoard[2] && gameBoard[0] != '') {
            return (gameBoard[0] == 'X' ? 10: -10)
        } else if (gameBoard[3] == gameBoard[4] && gameBoard[4] === gameBoard[5] && gameBoard[3] != '') {
            return (gameBoard[3] == 'X' ? 10: -10)
        } else if (gameBoard[6] == gameBoard[7] && gameBoard[7] === gameBoard[8] && gameBoard[6] != '') {
            return (gameBoard[6] == 'X' ? 10: -10)
        }

        // vertical win
        if (gameBoard[0] == gameBoard[3] && gameBoard[3] === gameBoard[6] && gameBoard[0] != '') {
            return (gameBoard[0] == 'X' ? 10: -10)
        } else if (gameBoard[1] == gameBoard[4] && gameBoard[4] === gameBoard[7] && gameBoard[1] != '') {
            return(gameBoard[1] == 'X' ? 10: -10)
        } else if (gameBoard[2] == gameBoard[5] && gameBoard[5] === gameBoard[8] && gameBoard[2] != '') {
            return (gameBoard[2] == 'X' ? 10: -10)
        }

        // diagnal win 
        if (gameBoard[0] == gameBoard[4] && gameBoard[4] === gameBoard[8] && gameBoard[0] != '') {
            return (gameBoard[0] == 'X' ? 10: -10)
        } else if (gameBoard[2] == gameBoard[4] && gameBoard[4] === gameBoard[6] && gameBoard[2] != '') {
            return (gameBoard[2] == 'X' ? 10: -10)
        }

        return 0
    }

    const minimax = (tempBoard, isMaximising) => {
        let score = checkWinner(tempBoard);
        if (score !== 0) return score;
        if (!tempBoard.includes("")) return 0; // Draw

        if (isMaximising) {
            let best = -Infinity;
            tempBoard.forEach((value, index) => {
                if (value === "") {
                    let newBoard = [...tempBoard]; // Copy board
                    newBoard[index] = "X";
                    best = Math.max(best, minimax(newBoard, false));
                }
            });
            return best;
        } else {
            let best = Infinity;
            tempBoard.forEach((value, index) => {
                if (value === "") {
                    let newBoard = [...tempBoard]; // Copy board
                    newBoard[index] = "O";
                    best = Math.min(best, minimax(newBoard, true));
                }
            });
            return best;
        }
    };
    
    const findBestMove = (tempBoard) => {
        let best = -Infinity
        let bestMove = -1
        
        tempBoard.forEach((value, index) => {
            if (value === '') {
                let newBoard = [...tempBoard]; // Copy board
                newBoard[index] = 'X';
                let tempBest = minimax(newBoard, false);
                
                if (tempBest > best) {
                    best = tempBest;
                    bestMove = index;
                }
            }
        })
        return bestMove
    }

    useEffect(() => {
        const win = checkWinner(board);
        if (win === 10) {
            setIsWinner(true);
            setWinner("The winner is AI (X)");
        } else if (win === -10) {
            setIsWinner(true);
            setWinner("The winner is Player (O)");
        } else if (!board.includes("")) {
            setIsWinner(true);
            setWinner("It's a Draw");
        } else if (turn === "X") {
            // AI makes a move after the player plays
            let bestMove = findBestMove(board);
            if (bestMove !== -1) {
                let tempBoard = [...board];
                tempBoard[bestMove] = "X";
                setBoard(tempBoard);
                setTurn("O");
            }
        }
    }, [turn, board]); // Make sure both `turn` and `board` are dependencies here
    

    const handleRestart = () => {
        setWinner("")
        setIsWinner(false)
        setBoard(Array(9).fill(''))
        setTurn('X')
    }
    

    return (
        <div className="flex pt-40 items-center min-h-screen flex-col gap-4">
            <div><p className="text-3xl font-bold pb-10">Human vs AI</p></div>
            <div className="grid grid-cols-3 gap-2 bg-black rounded-lg p-2 font-bold">
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
            {isWinner ? (
                <div className=" bg-slate-300 w-[16rem] h-[7rem] flex justify-center items-center flex-col gap-2">
                    <p className="text-xl">{winner}!</p>{" "}
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
        </div>
    );
}

export default App;
