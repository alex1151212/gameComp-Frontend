import React, { useEffect, useState } from "react";
import { GamesType } from "../game-card/type";
import GameCard from "../game-card";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [games, setGames] = useState<GamesType[]>([]); // [games, setGames
  const getGames = async () => {
    const response = await fetch("assets/data/historyGamesData.json");
    const games = await response.json();
    return games;
  };

  useEffect(() => {
    getGames().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <div className="games">
      <div className="games-content">
        <h1>歷屆遊戲</h1>
        <div className="games-content-card-wrapper">
          {games.map((game) => (
            <GameCard
              key={game.name}
              name={game.name}
              reward={game.reward}
              imgLink={game.imgLink}
              pdfLink={game.pdfLink}
              youtubeLink={game.youtubeLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
