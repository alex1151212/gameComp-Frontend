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
        <div className="agenda-content-comp">
          <h1>複賽相關事項</h1>
          <ol type="A">
            <li>各組組長提供電話、mail</li>
            <li>各組參與人員姓名、葷素數量以方便訂餐</li>
            <li>
              所有複賽入選者都會有攤位可以做展示和DEMO，並上台報告角逐後續獎項
            </li>
            <li>POSTER會有專門區域可以貼海報</li>
            <li>
              特別注意：複賽上台報告不可於台上實機DEMO(撥放影片可)，違者直接棄權。實機DEMO請在攤位上進行
            </li>
          </ol>
        </div>
        <div className="agenda-content-about">
          <h1>「創意遊戲設計大賽成果展示暨頒獎典禮」時程規劃</h1>
          <ul>
            <li>主辦單位：鈊象電子股份有限公司</li>
            <li>臺灣科技大學 數位發展研究中心</li>
            <li>
              協辦單位：
              <ul>
                <li>台灣大學</li>
                <li>政治大學</li>
                <li>海洋大學</li>
                <li>華梵大學</li>
              </ul>
            </li>

            <li>活動日期：111年1月18日 星期二</li>
            <li>活動地點：國際大樓 IB-101</li>
          </ul>
        </div>
        <div className="agenda-content-result">
          <h1>比賽結果</h1>
          <table className="agenda-content-result-table">
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
          {/* <table cellSpacing={0} cellPadding="5" border={2}>
            <tr>
              <td className="session-width">Session</td>
              <td className="time-width">Time</td>
              <td className="activity-width">Activity</td>
              <td className="base-width">Note</td>
            </tr>
            <tr>
              <td className="session-width"></td>
              <td className="time-width">09:30-10:00</td>
              <td className="activity-width">展示設置</td>
              <td className="base-width">30分鐘</td>
            </tr>
            <tr>
              <td>1</td>
              <td>10:00-11:30</td>
              <td></td>
              <td>90分鐘</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>遊戲椅子</td>
              <td>(各組15分鐘)</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>地城潛行者 Dungeon Supplier</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Guten Tag</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>靈車甩尾</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>戰患</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Card Master</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>11:30-12:15</td>
              <td>
                <p>coffee break</p> <p>評審試玩</p>
              </td>
              <td>45分鐘</td>
            </tr>

            <tr>
              <td></td>
              <td>12:15-13:00</td>
              <td>lunch time</td>
              <td>45分鐘</td>
            </tr>
            <tr>
              <td>2</td>
              <td>13:00-14:15</td>
              <td></td>
              <td>75分鐘</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>魯比克之星</td>
              <td>(各組15分鐘)</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>好油喔peko茶</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Devil Wager: Revenge</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>To be Diff</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>V(=^･ω･^=)v</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>14:15-15:00</td>
              <td>
                <p>coffee break</p> <p>評審試玩</p>
              </td>
              <td>45分鐘</td>
            </tr>
            <tr>
              <td>3</td>
              <td>15:00-16:15</td>
              <td></td>
              <td>75分鐘</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Memoid Studio</td>
              <td>(各組15分鐘)</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>LIVE & EVIL</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>[W]orl[D] [M]a[K]er</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>GOOP</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>假日車庫</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td>16:15-17:00</td>
              <td>
                <p>coffee break</p> <p>評審試玩、評分</p>
              </td>
              <td>45分鐘</td>
            </tr>

            <tr>
              <td></td>
              <td>17:00-18:00</td>
              <td>頒獎</td>
              <td>60分鐘</td>
            </tr>
          </table> */}
        </div>
      </div>
    </div>
  );
};
export default Agenda;
