import React, { useEffect, useState } from "react";
interface RulesProps {}

const Rules: React.FC<RulesProps> = () => {
  const [rewardList, setRewardList] = useState<{ [key: string]: string }>({});
  const getAgenda = async () => {
    const response = await fetch("./fakeRuleData.json");
    const rewardListData = await response.json();
    return rewardListData;
  };

  useEffect(() => {
    getAgenda().then((item) => {
      setRewardList(item);
    });
  }, []);

  return (
    <div className="rules">
      <div className="rules-content">
        <div className="rules-content-schedule-wrapper">
          <h1 className="rules-content-schedule-header">重要日程</h1>
          <div className="rules-content-schedule">
            <div className="rules-content-schedule-date">
              <p>2021/12/01</p>
              <p>2021/12/30</p>
              <p>2022/01/10</p>
              <p>2022/01/18</p>
            </div>
            <div className="rules-content-schedule-bar">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="rules-content-schedule-describe">
              <p>網頁上線及隊伍帳戶建構</p>
              <p>初賽上傳截止日期(上傳影片及文件)</p>
              <p>公告複賽入選隊伍</p>
              <p>複賽隊伍DEMO日</p>
            </div>
          </div>
        </div>
        <div className="rules-content-competition-rules">
          <h1>比賽規則</h1>
          <ol type="A">
            <li>
              每一組於UPLOAD區上傳遊戲展示影片以及說明文件，最後入選組別由評審們審出
            </li>
            <li>
              入選隊伍於比賽當日(詳見Agenda分頁)9:00以前至台科大IB大樓一樓報到(暫定)，領取參賽獎金、張貼海報及準備設備
            </li>
            <li>於9:30 - 17:00間進行擺攤</li>
            <li>
              依序報告(每組10分鐘，時間到請直接進行5分鐘Q&A)，報告順序詳見Agenda分頁
            </li>
          </ol>
        </div>
        <div className="rules-content-reward">
          <h1>獎項</h1>
          <table className="rules-content-reward-table">
            <tr>
              <td>獎項</td>
              <td>隊名</td>
            </tr>
            {Object.entries(rewardList).map(([key, value]) => (
              <tr>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
export default Rules;
