import React, { useEffect, useState } from "react";
import { GamesType } from "../game-card/type";
import GameCard from "../game-card";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [historyGames, setHistoryGames] = useState<GamesType[]>([]);
  const [games2023, setGames2023] = useState<GamesType[]>([]);
  const getGames2023 = async () => {
    const response = await fetch("assets/data/games2023Data.json");
    const historyGames = await response.json();
    return historyGames;
  };
  const getHistoryGames = async () => {
    const response = await fetch("assets/data/historyGamesData.json");
    const historyGames = await response.json();
    return historyGames;
  };

  useEffect(() => {
    getHistoryGames().then((game) => {
      setHistoryGames(game);
    });
    getGames2023().then((game) => {
      setGames2023(game);
    });
  }, []);

  return (
    <div className="games">
      <div className="games-content">
        <h1>本屆入圍遊戲</h1>
        <div className="games-content-card-wrapper">
          {games2023.map((game) => (
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
        <br />
        <h1>歷屆遊戲</h1>
        <div className="games-content-card-wrapper">
          {historyGames.map((game) => (
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
