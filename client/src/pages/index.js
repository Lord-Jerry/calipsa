import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import MaterialTable from "material-table";
import Filters from "../components/Filters";
import { useFetchAlarmEvents } from "../hooks/event";
import "./index.css";

const columns = () => [
  { title: "Location", field: "locationName" },
  { title: "Outcome", field: "outcome" },
  { title: "Time", field: "timestamp" },
];
function App() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [_, setErrors] = useState([]);
  const [data, setData] = useState({ data: [] });
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [outcome, setOutcome] = useState("any");

  const fetchAlarmEvents = useFetchAlarmEvents({
    setLoading,
    setErrors,
    setData,
    setPage,
  });

  const submitFilter = () => {
    if (!from && to) return alert("Filter from is required");
    if (from && !to) return alert("Filter to is required");

    fetchAlarmEvents(page, {
      date_from: from || undefined,
      date_to: to || undefined,
      outcome: new RegExp(/^true|false/i).test(outcome) ? outcome : undefined,
    });
  };

  const changePage = (increment = true) => {
    fetchAlarmEvents(increment ? page + 1 : page - 1, {
      date_from: from || undefined,
      date_to: to || undefined,
      outcome: new RegExp(/^true|false/i).test(outcome) ? outcome : undefined,
    });
    window.scroll(0, 0);
  };

  useEffect(() => {
    fetchAlarmEvents(page, {});
  }, []);
  return (
    <div className="table-container">
      <Filters
        from={from}
        to={to}
        outcome={outcome}
        setFrom={setFrom}
        setTo={setTo}
        setOutcome={setOutcome}
        submitFilter={submitFilter}
      />
      
      {/** table**/}
      <MaterialTable
        columns={columns()}
        isLoading={loading}
        data={
          data &&
          data.data.map((value) => ({
            ...value,
            timestamp: new Date(value.timestamp).toGMTString(),
          }))
        }
        title=""
        options={{
          search: false,
          paging: false,
        }}
      />

      {/** pagination **/}
      <Button
        className="prev-page-button"
        onClick={() => changePage(false)}
        variant="contained"
        color="primary"
        disableElevation
        disabled={page <= 1}
      >
        Previous page
      </Button>
      <Button
        className="next-page-button"
        onClick={changePage}
        variant="contained"
        color="primary"
        disableElevation
      >
        Next page
      </Button>
    </div>
  );
}

export default App;
