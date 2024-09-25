import { useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";
import { data } from "autoprefixer";
import DataTable from "react-data-table-component";
moment().local("id");
let socket;
const CONNECTION_PORT = process.env.REACT_APP_SOCKET_URL;

function App() {
  const [receiveMessage, setReciveMessage] = useState("");
  let [tableData, setTableData] = useState(JSON.stringify([]));
  const [name, setName] = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT, tableData]);

  useEffect(() => {
    socket.on("finish", (data) => {
      console.log("qwqw", data)
    });
  }, []);

  useEffect(() => {
    let data = localStorage.getItem("table-data");
    if (!data) {
      console.log("first!");
      setTableData(JSON.stringify([]));
    } else {
      console.log("first2", data);
      setTableData(data);
    }
  });

  const save = () => {
    if (name == "") {
      return alert("name is required");
    } else if (timestamp == "") {
      return alert("date is required");
    }
    // let date = moment().add("1", "minute").format("YYYYT-MM-DD HH:mm:ss");

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

    socket.emit("job", data);
    setName("");
    setTimestamp("");
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
}

export default App;
