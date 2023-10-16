import { Line, Wrapper } from "../components/Containers";
import { ErrorLabel, Label } from "../components/Labels/styles";
import TableData from "../components/Table";
import { TransactionViewModel } from "./TransactionViewModel";

function TransactionView() {
  const {
    loading,
    error,
    startDate,
    endDate,
    dataFiltered,
    data,
    setStartDate,
    setEndDate,
    fetchWithFilter,
    cleanFilter,
  } = TransactionViewModel();
  return (
    <Wrapper>
      {loading && <h3>Loading...</h3>}
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
  );
}

export default TransactionView;
