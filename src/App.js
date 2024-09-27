import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import { useEffect, useState } from "react";
import * as context from "./helper/helper";
import UpdateJobs from "./page/Update";
import pusher from "./helper/pusher";

let API_URL = process.env.REACT_APP_API_URL;

function App() {
  console.log("qwqwqwqasasa", API_URL);
  let [tableData, setTableData] = useState(JSON.stringify([]));
  let [localData, setLocalData] = useState(JSON.stringify([]));
  const [doneReminder, setDoneReminder] = useState();

  useEffect(() => {
    let data = localStorage.getItem("table-data");
    if (!data) {
      setTableData(JSON.stringify([]));
      setLocalData(JSON.stringify([]));
    } else {
      setTableData(data);
      setLocalData(data);
    }
  }, [localData, tableData, API_URL]);

  useEffect(() => {
    const channel = pusher.subscribe("reminder");
    channel.bind("done", (data) => {
      console.log("cek done", data);
      setDoneReminder(data);
    });
  }, [doneReminder]);

  return (
    <>
      <div className="w-full">
        <context.default.jobsData.Provider
          value={{
            tableData,
            setTableData,
            localData,
            setLocalData,
            API_URL,
            doneReminder,
            setDoneReminder,
          }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/update/:id" element={<UpdateJobs />} />
            </Routes>
          </Router>
        </context.default.jobsData.Provider>
      </div>
    </>
  );
}

export default App;
