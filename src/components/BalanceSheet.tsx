import React, { useState } from 'react';
import './BalanceSheet.css'; // Import the CSS file

interface Transaction {
  id: number;
  type: 'credit' | 'debit';
  amount: number;
  purpose: string;
}

const BalanceSheet: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<'credit' | 'debit'>('credit');
  const [purpose, setPurpose] = useState<string>(''); // Add purpose state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handlePurposeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurpose(e.target.value); // Update purpose from input
  };

  const addTransaction = () => {
    const parsedAmount = Number(amount);
    if (parsedAmount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type,
      amount: parsedAmount,
      purpose, // Use purpose from state
    };

    setTransactions([...transactions, newTransaction]);
    setAmount(0); // Reset the input
    setPurpose(''); // Reset purpose
  };

  const calculateTotals = () => {
    const totalCredits = transactions
      .filter(t => t.type === 'credit')
      .reduce((total, t) => total + t.amount, 0);
    const totalDebits = transactions
      .filter(t => t.type === 'debit')
      .reduce((total, t) => total + t.amount, 0);
    return { totalCredits, totalDebits };
  };

  const { totalCredits, totalDebits } = calculateTotals();

  return (
    <div className="balance-sheet">
      <h1>Balance Sheet</h1>
      <div className="transaction-input">
        <input
          type="number"
          value={amount}
          onChange={handleInputChange}
          placeholder="Amount"
        />
        <select value={type} onChange={e => setType(e.target.value as 'credit' | 'debit')}>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        <br />
        <input
          type="text"
          value={purpose}
          onChange={handlePurposeChange} // Handle purpose change
          placeholder="Purpose"
        />
        <br />
        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total</h2>
      <p>Credits: {totalCredits.toFixed(2)}</p>
      <p>Debits: {totalDebits.toFixed(2)}</p>
      <p>Balance: {(totalCredits - totalDebits).toFixed(2)}</p>
    </div>
  );
};

export default BalanceSheet;
