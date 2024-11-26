'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type TransactionType = 'gelir' | 'gider';

type Transaction = {
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
  category: string;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
};

const LOCAL_STORAGE_KEY = 'transactions';

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // LocalStorage'dan verileri yükleme
  useEffect(() => {
    const savedTransactions = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // LocalStorage'a verileri kaydetme
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  const getTotalIncome = () => {
    return transactions
      .filter((transaction) => transaction.type === 'gelir')
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter((transaction) => transaction.type === 'gider')
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        getTotalIncome,
        getTotalExpenses,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionContext must be used within a TransactionProvider');
  }
  return context;
};
