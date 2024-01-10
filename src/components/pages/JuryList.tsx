import React from "react";
interface HomeProps {}

const JuryList: React.FC<HomeProps> = () => {
//   const [games, setGames] = useState<GamesType[]>([]); // [games, setGames
//   const getGames = async () => {
//     const response = await fetch("assets/data/historyGamesData.json");
//     const games = await response.json();
//     return games;
//   };

//   useEffect(() => {
//     getGames().then((games) => {
//       setGames(games);
//     });
//   }, []);

  return (
    <div className="jury-list">
      <div className="jury-list-content">
        <h1>評審名單</h1>
        <div>評審名單</div>
        {/* <div className="games-content-card-wrapper">
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
        </div> */}
      </div>
    </div>
  );
};
export default JuryList;
