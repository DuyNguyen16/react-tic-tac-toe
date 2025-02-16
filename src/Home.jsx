import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center md:pt-48">
            <div>
                <p className="text-4xl font-bold pb-14">TicTacToe</p>
            </div>
            <div className="flex flex-col gap-2">
                <Link
                    to={"/player-vs-ai"}
                    className="border border-black rounded-md px-20 py-4 hover:bg-gray-300 duration-150 transition-colors"
                >
                    <p className="text-center font-bold">Player vs AI</p>
                </Link>
                <Link to={'/player-vs-player'} className="border border-black rounded-md px-20 py-4 hover:bg-gray-300 duration-150 transition-colors">
                <p className="text-center font-bold">Player vs Player</p>
                </Link>
                <button className="border border-black rounded-md bg-[#292828] px-20 py-4 hover:bg-gray-300 duration-150 transition-colors">
                <p className="text-center text-white font-bold">Setting</p>
                </button>
            </div>
        </div>
    );
};

export default Home;
