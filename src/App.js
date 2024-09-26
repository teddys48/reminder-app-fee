import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import { useEffect, useState } from "react";
import * as context from "./helper/helper";
import UpdateJobs from "./page/Update";

let API_URL = process.env.REACT_APP_API_URL;

function App() {
  console.log("qwqwqwqasasa", API_URL);
  let [tableData, setTableData] = useState(JSON.stringify([]));
  let [localData, setLocalData] = useState(JSON.stringify([]));
  let a = localStorage.getItem("table-data");
  useEffect(() => {
    API_URL = process.env.REACT_APP_API_URL;
    let data = localStorage.getItem("table-data");
    console.log("qwqwqqw", data);
    if (!data) {
      console.log("first@");
      setTableData(JSON.stringify([]));
      setLocalData(JSON.stringify([]));
    } else {
      console.log("first#", data);
      setTableData(data);
      setLocalData(data);
    }
  }, [localData, tableData, API_URL]);

  return (
    <>
      <div className="w-full">
        <context.default.jobsData.Provider
          value={{ tableData, setTableData, localData, setLocalData, API_URL }}
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
