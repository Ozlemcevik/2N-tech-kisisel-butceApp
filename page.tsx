"use client";

import { useTransactionContext } from "./context/TransactionContext";

const Home = () => {
  const { getTotalIncome, getTotalExpenses } = useTransactionContext();

  // Gelir ve gider hesaplamaları
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const remainingBudget = totalIncome - totalExpenses;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Bütçe Hesap</h1>

      {/* Toplam Gelir Kutusu */}
      <div className="p-4 mb-6 bg-green-100 text-green-800 rounded-md">
        <h2 className="font-bold text-lg">Toplam Gelir</h2>
        <p className="text-xl">{totalIncome} TL</p>
      </div>

      {/* Toplam Gider Kutusu */}
      <div className="p-4 mb-6 bg-red-100 text-red-800 rounded-md">
        <h2 className="font-bold text-lg">Toplam Gider</h2>
        <p className="text-xl">{totalExpenses} TL</p>
      </div>

      {/* Kalan Bütçe Kutusu */}
      <div
        className={`p-4 mb-6 rounded-md ${
          remainingBudget < 0 ? "bg-red-200 text-red-800" : "bg-green-100 text-green-800"
        }`}
      >
        <h2 className="font-bold text-lg">Kalan Bütçe</h2>
        <p className="text-xl">
          {remainingBudget < 0 ? (
            <>
              <span className="text-red-600">-</span> {Math.abs(remainingBudget)} TL
            </>
          ) : (
            `${remainingBudget} TL`
          )}
        </p>
        {remainingBudget < 0 && (
          <p className="text-sm text-red-600">Dikkat! Giderler gelirden fazla!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
