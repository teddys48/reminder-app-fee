import { useContext } from "react";
import { useParams } from "react-router-dom";
import * as context from "../helper/helper";

const UpdateJobs = () => {
  console.log("check update");
  //   let data = localStorage.getItem("table-data");
  const { tableData, setTableData, localData, setLocalData } = useContext(
    context.default.jobsData
  );
  let { id } = useParams();
  localStorage.setItem("table-data", JSON.stringify([]));
  setTableData(JSON.stringify([]));
  setLocalData(JSON.stringify([]));
  return (
    <>
      <div>lasbdaslbdls</div>
    </>
  );
};

export default UpdateJobs;
