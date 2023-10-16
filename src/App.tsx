import { useEffect, useState } from "react";
import { fetchData } from "./services/api";
import { Transaction } from "./models/Transaction";
import { ErrorLabel, Label } from "./components/Labels/styles";
import { Line, Wrapper } from "./components/Containers";
import TableData from "./components/Table";

function App() {
  const [data, setData] = useState<Transaction[]>([]);
  const [error, setError] = useState("x");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataFiltered, setDataFiltered] = useState<Transaction[]>([]);

  const fetch = async () => {
    try {
      const result = await fetchData();
      setData(result);
    } catch (er) {
      setError("Internal error. Try again later.");
    }
  };

  const fetchWithFilter = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const filtered = data.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= start && transactionDate <= end;
      });

      setDataFiltered(filtered);
    } else {
      setDataFiltered(data);
      alert("Insert the start and end date.");
    }
  };

  const cleanFilter = () => {
    setStartDate("");
    setEndDate("");
    setDataFiltered([]);
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="App">
      <Wrapper>
        {error && <ErrorLabel></ErrorLabel>}
        <Line>
          <Label>
            From:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Label>
          <Label>
            End:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Label>
          <button onClick={fetchWithFilter}>Filter</button>
          <button onClick={cleanFilter} style={{ marginLeft: 16 }}>
            Clean
          </button>
        </Line>
        {endDate && startDate && dataFiltered.length ? (
          <TableData data={dataFiltered} />
        ) : (
          <TableData data={data} />
        )}
      </Wrapper>
    </div>
  );
}

export default App;
