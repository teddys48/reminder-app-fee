import { useContext, useEffect, useState } from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import * as context from "../helper/helper";
import axios from "axios";
import pusher from "../helper/pusher";
moment().local("id");

const Home = () => {
  const {
    tableData,
    setTableData,
    localData,
    setLocalData,
    API_URL,
    doneReminder,
    setDoneReminder,
  } = useContext(context.default.jobsData);
  const [name, setName] = useState("");
  const [timestamp, setTimestamp] = useState("");
  // const channelPusher = pusher.subscribe("reminder");
  // channelPusher.bind("done", (data) => {
  //   console.log(data);
  //   setDoneReminder("qwqw");
  // });

  useEffect(() => {
    console.log("data changes");
    function storageEventHandler(event) {
      if (event.key === "table-data") {
        console.log("cvcvcvc", localStorage.getItem("table-data"));
        setTableData(localStorage.getItem("table-data"));
      }
    }

    window.addEventListener("storage", storageEventHandler);
    return () => {
      // Remove the handler when the component unmounts
      window.removeEventListener("storage", storageEventHandler);
    };
  }, [tableData, localData, localStorage.getItem("table-data")]);

  useEffect(() => {
    console.log("cek reminder", doneReminder);
    let dataLocal = JSON.parse(localStorage.getItem("table-data"));
    for (const element of dataLocal) {
      console.log("cek id", element.id);
      if (element.id == doneReminder) {
        console.log("cek status", element.id);
        element.status = "DONE";
      }
    }
    console.log("is updated", dataLocal);
    localStorage.setItem("table-data", JSON.stringify(dataLocal));
    setTableData(JSON.stringify(dataLocal));
    setLocalData(JSON.stringify(dataLocal));
  }, [doneReminder]);

  const save = async () => {
    if (name == "") {
      return alert("name is required");
    } else if (timestamp == "") {
      return alert("date is required");
    }

    let data = JSON.parse(tableData);
    if (data.length == 0) {
      data = [
        {
          id: moment().unix(),
          name: name,
          status: "ON PROGRESS",
          time: moment(timestamp).format("YYYY-MM-DD HH:mm:ss"),
        },
      ];
    } else {
      data.push({
        id: moment().unix(),
        name: name,
        status: "ON PROGRESS",
        time: moment(timestamp).format("YYYY-MM-DD HH:mm:ss"),
      });
    }

    localStorage.setItem("table-data", JSON.stringify(data));
    setTableData(JSON.stringify(data));

    await axios
      .post(API_URL + "api/jobs/add", { data: data })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    setName("");
    setTimestamp("");
  };

  const deleteData = async (id) => {
    console.log("delete", id);
  };

  const done = async (id) => {
    console.log("done", id);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "On",
      selector: (row) => row.time,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      cell: (param) => {
        return (
          <>
            <div className="flex w-full space-x-2">
              <button
                className="px-2 flex py-1 bg-pink-400 text-white rounded-md"
                onClick={() => done(param.id)}
              >
                Done
              </button>
              <button
                className="px-2 py-1 bg-pink-400 text-white rounded-md"
                onClick={() => deleteData(param.id)}
              >
                Delete
              </button>
            </div>
          </>
        );
      },
    },
  ];

  const data = JSON.parse(tableData);

  return (
    <>
      <div className="flex flex-col w-full p-1">
        <span className="w-full">Reminder Scheduler</span>
        <div className="flex w-full p-4 justify-start space-x-2 flex-row">
          <input
            type="text"
            placeholder="name..."
            className="border-2 border-pink-400 rounded-md p-1"
            value={name}
            onChange={(e) => {
              console.log("qwqw", e.target.value);
              setName(e.target.value);
            }}
          />
          <input
            type="datetime-local"
            placeholder="date..."
            className="border-2 border-pink-400 rounded-md p-1"
            min={moment().local()}
            value={timestamp}
            onChange={(e) => {
              setTimestamp(e.target.value);
            }}
          />
          <button
            className=" px-3 hover:bg-pink-500 py-1 rounded-md text-white bg-pink-400"
            onClick={save}
          >
            Save
          </button>
        </div>
        <div className="flex w-full text-white">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default Home;
