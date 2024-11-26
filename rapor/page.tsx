"use client";

import React, { useState, useEffect } from "react";
import { useTransactionContext } from "../context/TransactionContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Transaction {
  id: number;
  date: string;
  type: "gelir" | "gider";
  amount: number;
}

const Report: React.FC = () => {
  const { transactions: contextTransactions } = useTransactionContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isMonthly, setIsMonthly] = useState<boolean>(true);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions) as Transaction[]);
    }
  }, []);

  useEffect(() => {
    if (contextTransactions.length > 0) {
      setTransactions(contextTransactions);
      localStorage.setItem("transactions", JSON.stringify(contextTransactions));
    }
  }, [contextTransactions]);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "gelir")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "gider")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const monthlyData: { [key: string]: number } = {};
  transactions.forEach((transaction) => {
    const month = new Date(transaction.date).toLocaleString("default", { month: "long" });
    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }
    if (transaction.type === "gelir") {
      monthlyData[month] += transaction.amount;
    } else if (transaction.type === "gider") {
      monthlyData[month] -= transaction.amount;
    }
  });

  const monthsLabels = Object.keys(monthlyData);
  const monthsData = monthsLabels.map((month) => monthlyData[month]);

  const years: { [key: number]: number } = {};
  transactions.forEach((transaction) => {
    const year = new Date(transaction.date).getFullYear();
    if (!years[year]) {
      years[year] = 0;
    }
    if (transaction.type === "gelir") {
      years[year] += transaction.amount;
    } else if (transaction.type === "gider") {
      years[year] -= transaction.amount;
    }
  });

  const yearsLabels = Object.keys(years);
  const yearsData = yearsLabels.map((year) => years[parseInt(year)]);

  const chartData = isMonthly
    ? {
        labels: monthsLabels,
        datasets: [
          {
            label: "Aylık Durum",
            data: monthsData,
            backgroundColor: monthsData.map((amount) =>
              amount >= 0 ? "rgba(75, 192, 192, 0.2)" : "rgba(255, 99, 132, 0.2)"
            ),
            borderColor: monthsData.map((amount) =>
              amount >= 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
            ),
            borderWidth: 1,
          },
        ],
      }
    : {
        labels: yearsLabels,
        datasets: [
          {
            label: "Yıllık Durum",
            data: yearsData,
            backgroundColor: yearsData.map((amount) =>
              amount >= 0 ? "rgba(75, 192, 192, 0.2)" : "rgba(255, 99, 132, 0.2)"
            ),
            borderColor: yearsData.map((amount) =>
              amount >= 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
            ),
            borderWidth: 1,
          },
        ],
      };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: isMonthly ? "Aylık Gelir ve Gider Raporu" : "Yıllık Gelir ve Gider Raporu",
      },
    },
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Gelir ve Gider Raporu</h1>

      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Gelir ve Gider Durumu</h2>
        <div className="flex justify-between text-lg mb-4">
          <p>Toplam Gelir: {totalIncome} TL</p>
          <p>Toplam Gider: {totalExpense} TL</p>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setIsMonthly(true)}
            className={`px-4 py-2 rounded-md mr-4 ${
              isMonthly ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Aylık
          </button>
          <button
            onClick={() => setIsMonthly(false)}
            className={`px-4 py-2 rounded-md ${
              !isMonthly ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Yıllık
          </button>
        </div>
      </div>

      <div className="mb-8">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Report;
