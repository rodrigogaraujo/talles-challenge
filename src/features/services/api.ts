import { Transaction } from "../models/Transaction";

export const fetchData = (): Promise<Transaction[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = [
        { id: 1, amount: 99, date: '2022-11-15', title: 'Spook things' },
        { id:2, amount: 1000, date: '2023-08-13', title: 'Spook things' },
        { id:3, amount: 99, date: '2023-09-11', title: 'Pet shop' },
        { id: 4, amount: 1000, date: '2023-10-11', title: 'Spook things' },
      ];
      resolve(data);
    }, 1500);
  });
};