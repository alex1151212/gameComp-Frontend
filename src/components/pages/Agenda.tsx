import React, { useEffect, useState } from "react";
interface AgendaProps {}

const Agenda: React.FC<AgendaProps> = () => {
  const [agenda, setAgenda] = useState<string[]>([]); // [games, setGames
  const getAgenda = async () => {
    const response = await fetch("assets/data/awardList.json");
    const agendaData = await response.json();
    return agendaData;
  };

  useEffect(() => {
    getAgenda().then((item) => {
      setAgenda(item);
    });
  }, []);

  return (
    <div className="agenda">
      <div className="agenda-content">
        <h1>比賽結果</h1>
        <table className="agenda-content-table">
          <thead>
            <tr>
              <td>獎項</td>
              <td>隊名</td>
            </tr>
          </thead>
          <tbody>
            {agenda.map((awardName) => (
              <tr key={awardName}>
                <td>{awardName}</td>
                <td>{"尚未公布"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Agenda;
