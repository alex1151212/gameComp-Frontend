import React, { useEffect, useState } from "react";
interface AgendaProps {}

const Agenda: React.FC<AgendaProps> = () => {
  const [agenda, setAgenda] = useState<string[]>([]); // [games, setGames
  const getAgenda = async () => {
    const response = await fetch("./awardList.json");
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
          <tr>
            <td>獎項</td>
            <td>隊名</td>
          </tr>
          {agenda.map((awardName) => (
            <tr>
              <td>{awardName}</td>
              <td>{"尚未公布"}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default Agenda;
