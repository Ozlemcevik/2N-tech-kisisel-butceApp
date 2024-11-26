"use client";

import { useState } from "react";
import { useTransactionContext } from "../context/TransactionContext";

type TransactionType = "gelir" | "gider";

type Category = "Yiyecek" | "Ulaşım" | "Eğlence" | "Diğer";

const Form = () => {
  const [type, setType] = useState<TransactionType>("gelir");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<Category>("Diğer");

  const { addTransaction, transactions } = useTransactionContext();

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !date) {
      alert("Tüm alanları doldurun!");
      return;
    }

    const newTransaction = {
      type,
      description,
      amount: Number(amount),
      date,
      category,
    };

    addTransaction(newTransaction);

    setDescription("");
    setAmount("");
    setDate("");
    setCategory("Diğer");
  };

  // Gelir ve gider toplamlarını hesaplama
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "gelir")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "gider")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Gelir ve Gider Takibi</h1>

      <form onSubmit={handleAddTransaction} className="p-4 bg-gray-100 rounded-md shadow-md mb-8">
        <h2 className="text-lg font-bold mb-4">Gelir/Gider Ekle</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Tür</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="gelir">Gelir</option>
            <option value="gider">Gider</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Açıklama</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Açıklama girin"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Tutar</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            placeholder="Tutar girin"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Tarih</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Yiyecek">Yiyecek</option>
            <option value="Ulaşım">Ulaşım</option>
            <option value="Eğlence">Eğlence</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Ekle
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4">İşlem Listesi</h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500">Henüz bir işlem eklenmedi.</p>
        ) : (
          <ul className="space-y-4">
            {transactions.map((transaction, index) => (
              <li
                key={index}
                className={`p-4 border rounded-md ${
                  transaction.type === "gelir" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{transaction.description}</span>
                  <span
                    className={`font-bold ${
                      transaction.type === "gelir" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.amount} TL
                  </span>
                </div>
                <p className="text-sm text-gray-500">{transaction.date}</p>
                <p className="text-sm text-gray-500">Kategori: {transaction.category}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Form;
