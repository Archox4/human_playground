import { Link, useNavigate } from 'react-router-dom';
import type { GameElement } from '../util/interfaces/interfaces';
import { useContext } from 'react';
import { GamesContext } from '../util/GamesContext';
import { Search } from 'lucide-react';

function Navbar(){
    const navigate = useNavigate();

    const handleRedirect = () =>{
        navigate("/");
    }

    const games: GameElement[] | null = useContext(GamesContext);

    return (
    <>
        <div className="sticky top-0 bg-dark-navbar/60 shadow-dark-navbar shadow-2xl w-screen rounded-2xl flex flex-row flex-nowrap p-5 justify-between">
            <div className="flex justify-center items-center flex-row ml-3 cursor-pointer" onClick={handleRedirect}>
                <h2>PLAYGROUND</h2>
            </div>
            <div className='flex flex-row justify-between space-x-5 items-center'>
                {games !== null && games.map((game, i) => {
                    return (
                    <div key={i} className='group transition-all'>
                        <Link to={game.pathTo}>
                            <div className='flex flex-col items-center px-4 py-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-cyan-main'>
                                {game.name}
                                <div className="h-0.5 w-full bg-cyan-main rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100" />
                            </div>
                        </Link>
                    </div>)
                })}
            </div>
            <div className="items-center mr-3">
                <input type="text" placeholder="Search..." className="xl:flex hidden w-20 h-10 pl-2 pr-2 bg-dark-gray rounded-xl min-w-100"/>
                <button className='cursor-pointer px-2 py-2 xl:hidden block'><Search/></button>
            </div>
        </div>
    </>)
}
export default Navbar;