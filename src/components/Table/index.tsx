import { Table, TableCell, TableHeader, TableRow } from "./style";
import { Transaction } from "../../models/Transaction";
import { formatCurrency } from "../../utils";

interface TableDataProps {
  data: Transaction[];
}
function TableData({ data }: TableDataProps) {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>ID</TableHeader>
          <TableHeader>Date</TableHeader>
          <TableHeader>Title</TableHeader>
          <TableHeader>Amount</TableHeader>
        </tr>
      </thead>
      <tbody>
        {data.map((transaction, i) => (
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
