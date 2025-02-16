import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PlayerVsPlayerPage() {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [turn, setTurn] = useState("O"); // Player O goes first
    const [isWinner, setIsWinner] = useState(false);
    const [winner, setWinner] = useState("");

    const handleOnClick = (index) => {
        if (!isWinner) {
            playerMove(index);
        }
    };

    const playerMove = (index) => {
        if (board[index] === "" && turn === "O") {
            const tempBoard = [...board];
            tempBoard[index] = "O";
            setBoard(() => tempBoard);
            setTurn("X");
        } else if (board[index] === "" && turn === "X") {
            const tempBoard = [...board];
            tempBoard[index] = "X";
            setBoard(() => tempBoard);
            setTurn("O");
        }
    };

    const checkWinner = (gameBoard) => {
        // horizontal win
        if (
            gameBoard[0] === gameBoard[1] &&
            gameBoard[1] === gameBoard[2] &&
            gameBoard[0] !== ""
        ) {
            return gameBoard[0] === "X" ? 10 : -10;
        } else if (
            gameBoard[3] === gameBoard[4] &&
            gameBoard[4] === gameBoard[5] &&
            gameBoard[3] !== ""
        ) {
            return gameBoard[3] === "X" ? 10 : -10;
        } else if (
            gameBoard[6] === gameBoard[7] &&
            gameBoard[7] === gameBoard[8] &&
            gameBoard[6] !== ""
        ) {
            return gameBoard[6] === "X" ? 10 : -10;
        }

        // vertical win
        if (
            gameBoard[0] === gameBoard[3] &&
            gameBoard[3] === gameBoard[6] &&
            gameBoard[0] !== ""
        ) {
            return gameBoard[0] === "X" ? 10 : -10;
        } else if (
            gameBoard[1] === gameBoard[4] &&
            gameBoard[4] === gameBoard[7] &&
            gameBoard[1] !== ""
        ) {
            return gameBoard[1] === "X" ? 10 : -10;
        } else if (
            gameBoard[2] === gameBoard[5] &&
            gameBoard[5] === gameBoard[8] &&
            gameBoard[2] !== ""
        ) {
            return gameBoard[2] === "X" ? 10 : -10;
        }

        // diagonal win
        if (
            gameBoard[0] === gameBoard[4] &&
            gameBoard[4] === gameBoard[8] &&
            gameBoard[0] !== ""
        ) {
            return gameBoard[0] === "X" ? 10 : -10;
        } else if (
            gameBoard[2] === gameBoard[4] &&
            gameBoard[4] === gameBoard[6] &&
            gameBoard[2] !== ""
        ) {
            return gameBoard[2] === "X" ? 10 : -10;
        }

        return 0;
    };

    useEffect(() => {
        const win = checkWinner(board);
        if (win === 10) {
            setIsWinner(true);
            setWinner("The winner is Player X");
        } else if (win === -10) {
            setIsWinner(true);
            setWinner("The winner is Player O");
        } else if (!board.includes("")) {
            setIsWinner(true);
            setWinner("It's a Draw");
        }
    }, [turn, board]); // Monitor turn and board for updates

    const handleRestart = () => {
        setWinner("");
        setIsWinner(false);
        setBoard(Array(9).fill(""));
        setTurn("O"); // Start with Player O
    };

    return (
        <div className="flex justify-center md:pt-40 items-center min-h-screen flex-col gap-4">
            <div>
                <p className="text-3xl font-bold pb-4">Player vs Player</p>
            </div>
            <div className={`text-2xl font-bold ${winner !== "The winner is Player X" ? "text-green-700" : "text-red-700"}`}>
                {winner}
            </div>
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

            <button
                className="border border-black hover:bg-gray-300 duration-150 transition-colors px-10 py-2 text-2xl font-bold rounded-sm mt-2"
                onClick={handleRestart}
            >
                <p>Restart game</p>
            </button>
            <Link to={"/"} className="border border-black px-6 hover:bg-gray-300 duration-150 transition-colors rounded-sm">Back</Link>
        </div>
    );
}

export default PlayerVsPlayerPage;
