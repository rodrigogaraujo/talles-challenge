import { useEffect, useState } from "react";
import { Transaction } from "../models/Transaction";
import { fetchData } from "../services/api";

export const TransactionViewModel = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataFiltered, setDataFiltered] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      const result = await fetchData();
      setData(result);
    } catch (er) {
      setError("Internal error. Try again later.");
    } finally {
      setLoading(false);
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
    fetch()
  }, []);

  return {
    data, error, startDate, endDate, dataFiltered, loading,
    setStartDate, setEndDate, cleanFilter, fetchWithFilter,fetch
  };
}