import { getDatabase, onValue, ref } from "firebase/database";
import Navbar from "./components/Navbar";
import app from "./firebase";
import { useCallback, useEffect, useMemo, useState } from "react";
import Data from "./types/data";
import determineStatus, { Status } from "./util/status-checker";

function App() {
  const database = getDatabase(app);

  const [dataState, setDataState] = useState<Data | undefined>(undefined);

  const [dataArray, setDataArray] = useState<
    { timeStamp: Date; data: Data }[] | undefined
  >(undefined);

  const [status, setStatus] = useState<Status>("");

  const getData = useCallback(() => {
    const distance = ref(database, "/distance");
    const moisture = ref(database, "/moisture");
    const vibration = ref(database, "/vibration");

    onValue(distance, (snapshot) => {
      const data: number = snapshot.val();
      setDataState((prevState) => {
        return { ...prevState, distance: data };
      });
    });
    onValue(moisture, (snapshot) => {
      const data: number = snapshot.val();
      setDataState((prevState) => {
        return { ...prevState, moisture: data };
      });
    });
    onValue(vibration, (snapshot) => {
      const data: number = snapshot.val();
      setDataState((prevState) => {
        return { ...prevState, vibration: data };
      });
    });
  }, [database]);

  const renderDataArray = useMemo(() => {
    if (!dataArray) {
      return;
    }

    return dataArray.map((data, index) => {
      if (!data.data) {
        return;
      }
      return (
        <tr key={`data-${index}`}>
          <td>{data.timeStamp.toLocaleTimeString()}</td>
          <td>{data.data.distance} </td>
          <td>{data.data.moisture} </td>
          <td>{data.data.vibration}</td>
          <td>
            {determineStatus({
              distance: data.data.distance!,
              moisture: data.data.moisture!,
              vibration: data.data.vibration!,
            })}
          </td>
        </tr>
      );
    });
  }, [dataArray]);

  useEffect(() => {
    if (!dataState) {
      return;
    }
    setDataArray((prevState) => {
      if (!prevState) {
        return [{ timeStamp: new Date(), data: dataState }];
      }
      return [...prevState, { timeStamp: new Date(), data: dataState }];
    });

    const status = determineStatus({
      distance: dataState.distance!,
      moisture: dataState.moisture!,
      vibration: dataState.vibration!,
    });

    setStatus(status);
  }, [dataState]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Navbar />

      <section className=" px-2 max-w-[1200px] mx-auto mt-8 my-4">
        <div className="card w-full bg-base-100 shadow-xl mx-auto">
          <div className="card-body">
            <h2 className="card-title mx-auto">Current Reading</h2>

            <div className="text-xl font-bold text-center">
              Status:{" "}
              {dataState && (
                <span
                  className={
                    status === "Safe"
                      ? "text-green-500"
                      : status === "Alert"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }
                >
                  {status}
                </span>
              )}
            </div>
            <hr className="mt-4" />

            <>
              <div>Vibration: {dataState && dataState.vibration}</div>
              <div>Distance: {dataState && dataState.distance}</div>
              <div>Moisture: {dataState && dataState.moisture}</div>
            </>
          </div>
        </div>

        <div className="card w-full bg-base-100 shadow-xl mx-auto mt-12">
          <div className="card-body">
          <h2 className="card-title">Past Readings</h2>
            <div
              className=" rounded-2"
              style={{ maxHeight: "400px", overflow: "auto" }}
            >

              {dataArray && dataArray.length > 0 ? (
                <table className="table table-zebra mt-4">
                  <thead>
                    <tr>
                      <th>Time Stamp</th>
                      <th>Vibration</th>
                      <th>Distance</th>
                      <th>Moisture</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderDataArray ? renderDataArray.reverse() : <></>}
                  </tbody>
                </table>
              ) : (
                <div className="text-center mt-4">No Data Available</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
