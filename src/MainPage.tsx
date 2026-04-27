import { useContext, useEffect, useState } from "react";
import { GamesContext } from "./util/GamesContext";
import type { GameElement } from "./util/interfaces/interfaces";
import { ChevronsLeft, ChevronsRight } from "lucide-react";


const MainPage = () => {

  const games: GameElement[] | null = useContext(GamesContext);
  const [selectedGameId, setSelectedGameId] = useState(0);

  useEffect(() => {
    if (!games || games.length === 0) return;

    const timer = setTimeout(() => {
      setSelectedGameId((prev) => {
        return (prev + 1) % games.length;
      });
    }, 10000);

    return () => clearTimeout(timer);
  }, [selectedGameId, games]);

  const setNextId = () => {
    if (!games || games.length === 0) return;
    setSelectedGameId((prev) => {
        return (prev + 1) % games.length;
      });
  }
  const setPrevId = () => {
    if (!games || games.length === 0) return;
    setSelectedGameId((prev) => {
      return prev > 0 ? (prev - 1) : games.length - 1
    })
  }

  return (
    <div className="flex flex-row flex-nowrap w-screen p-10">
      {games !== null && 
        <div className="flex flex-row w-screen opacity-0 animate-fade-in" key={selectedGameId}>
          <div className="w-2/5 justify-start">
            <div className="flex ml-15 flex-col items-start justify-items-start">
              {games[selectedGameId].name.split(" ").map((word, i) => {
                return (<p key={i} className="text-8xl text-cyan-main font-bold">{word}</p>)
              })}
              <p className="text-default-text text-start py-5">
              {games[selectedGameId].description}
              </p>
            </div>
          </div>

          {/* slider */}
          <div className="w-3/5 h-100 bg-dark-gray-1/60 rounded-2xl mx-40 relative group">
            {games[selectedGameId].component}
            <div className="absolute w-20 left-0 inset-y-2 px-5 z-20 flex flex-row items-center justify-between">
              <button className="rounded-2xl h-10 w-15 shadow-2xl shadow-dark-gray-1 flex justify-center items-center cursor-pointer 
                transition-all delay-100 ease-in-out hover:w-18 hover:h-12 hover:bg-dark-gray-1/90" onClick={setPrevId}><ChevronsLeft/></button>
            </div>
            <div className="absolute w-20 right-0 inset-y-2 px-5 z-20 flex flex-row items-center justify-between">
              <button className="rounded-2xl h-10 w-15 shadow-2xl shadow-dark-gray-1 flex justify-center items-center cursor-pointer 
                transition-all delay-100 ease-in-out hover:w-18 hover:h-12 hover:bg-dark-gray-1/90" onClick={setNextId}><ChevronsRight/></button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default MainPage;