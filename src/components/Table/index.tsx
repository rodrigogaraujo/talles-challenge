import { Table, TableCell, TableHeader, TableRow } from "./style";
import { Transaction } from "../../models/Transaction";
import { formatCurrency } from "../../utils";
import { useState } from "react";

interface TableDataProps {
  data: Transaction[];
}
function TableData({ data }: TableDataProps) {
  const [sortedValues, setSortedValues] = useState(data);

  const handleSort = (typeSort: "date" | "amount") => {
    const sorted = [...sortedValues].sort((a, b) => {
      if (typeSort === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      } else {
        return b.amount - a.amount;
      }
    });
    setSortedValues(sorted);
  };

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>ID</TableHeader>
          <TableHeader
            style={{ cursor: "pointer" }}
            onClick={() => handleSort("date")}
          >
            Amount
          </TableHeader>
          <TableHeader>Title</TableHeader>
          <TableHeader
            style={{ cursor: "pointer" }}
            onClick={() => handleSort("amount")}
          >
            Amount
          </TableHeader>
        </tr>
      </thead>
      <tbody>
        {sortedValues.map((transaction, i) => (
          <TableRow hasBg={i % 2 !== 0} key={transaction.id}>
            <TableCell>{transaction.id}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.title}</TableCell>
            <TableCell>{formatCurrency(transaction.amount)}</TableCell>
          </TableRow>
        ))}
      </tbody>
      <div>
        <h2>
          Total:{" "}
          {formatCurrency(data.reduce((acc, cur) => acc + cur.amount, 0))}
        </h2>
      </div>
    </Table>
  );
}

export default TableData;
