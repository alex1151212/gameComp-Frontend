import React, { useEffect, useState } from "react";
interface HomeProps {}

const Agenda: React.FC<HomeProps> = () => {
  const [agenda, setAgenda] = useState<{ [key: string]: string }>({}); // [games, setGames
  const getAgenda = async () => {
    const response = await fetch("./fakeAgendaData.json");
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
          {Object.entries(agenda).map(([key, value]) => (
            <tr>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default Agenda;
