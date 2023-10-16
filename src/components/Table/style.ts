import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid black;
`;

export const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid black;
  background-color: #f5f5f5;
`;

export const TableRow = styled.tr<{ hasBg?: boolean }>`
  background-color: ${({hasBg}) => hasBg ? '#ebebeb' : 'white'};
`;
