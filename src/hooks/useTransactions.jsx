import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  loadTransactions,
  addTransaction,
  deleteTransaction,
  ClearTransactionData,
} from '../data/DataController';


/*
seperated out data functionalities to avoid
doing boilerplate code in every single screen of the app
*/
export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);

  const reload = async () => {
    const data = await loadTransactions();
    setTransactions(data);
  };

  const add = async (tx) => {
    setTransactions(await addTransaction(tx));
  };

  const remove = async (id) => {
    setTransactions(await deleteTransaction(id));
  };

  const clearAll = async () => {
    await ClearTransactionData();
    await reload();
  };

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [])
  );

  return {
    transactions,
    add,
    remove,
    clearAll,
  };
}
