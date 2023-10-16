import { useEffect, useState } from "react";
import { fetchData } from "./services/api";
import { Transaction } from "./models/Transaction";
import { ErrorLabel } from "./components/Labels/styles";
import { Wrapper } from "./components/Containers";
import TableData from "./components/Table";

function App() {
  const [data, setData] = useState<Transaction[]>([]);
  const [error, setError] = useState("x");

  const fetch = async () => {
    try {
      const result = await fetchData();
      setData(result);
    } catch (er) {
      setError("Internal error. Try again later.");
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="App">
      <Wrapper>{error && <ErrorLabel></ErrorLabel>}</Wrapper>
      <TableData data={data} />
    </div>
  );
}

export default App;
