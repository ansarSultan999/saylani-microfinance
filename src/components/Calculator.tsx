import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Calculator.css'; // Import the CSS file for styling

interface LoanBreakdown {
  totalLoan: number;
  monthlyPayment: number;
}

const loanCategories = {
  wedding: {
    subcategories: ['Valima', 'Furniture', 'Valima Food', 'Jahez'],
    maxLoan: '5 Lakh',
    period: '3 years',
  },
  home: {
    subcategories: ['Structure', 'Finishing', 'Loan'],
    maxLoan: '10 Lakh',
    period: '5 years',
  },
  business: {
    subcategories: ['Buy Stall', 'Advance Rent for Shop', 'Shop Assets', 'Shop Machinery'],
    maxLoan: '10 Lakh',
    period: '5 years',
  },
  education: {
    subcategories: ['University Fees', 'Child Fees Loan'],
    maxLoan: 'Based on requirement',
    period: '4 years',
  },
};

const Calculator: React.FC = () => {
  const [category, setCategory] = useState<keyof typeof loanCategories | ''>('');
  const [subcategory, setSubcategory] = useState<string>('');
  const [initialDeposit, setInitialDeposit] = useState<string>(''); // Use string to handle empty input
  const [loanPeriod, setLoanPeriod] = useState<string>(''); // Use string to handle empty input
  const [loanBreakdown, setLoanBreakdown] = useState<LoanBreakdown | null>(null);

  const calculateLoan = (): void => {
    const deposit = Number(initialDeposit);
    const period = Number(loanPeriod);

    if (isNaN(deposit) || deposit <= 0 || isNaN(period) || period <= 0) {
      alert('Please enter valid values for deposit and loan period.');
      return;
    }

    const totalLoan = deposit * 2; // Example calculation
    const monthlyPayment = totalLoan / (period * 12);

    setLoanBreakdown({
      totalLoan,
      monthlyPayment,
    });
  };

  return (
    <div className="calculator">
      <h2>Loan Calculator</h2>
      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value as keyof typeof loanCategories)}>
          <option value="">Select Category</option>
          {Object.keys(loanCategories).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)} Loans
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Subcategory</label>
        <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} disabled={!category}>
          <option value="">Select Subcategory</option>
          {category &&
            loanCategories[category]?.subcategories.map((subcat, index) => (
              <option key={index} value={subcat}>
                {subcat}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Initial Deposit</label>
        <input
          type="number"
          value={initialDeposit}
          onChange={(e) => setInitialDeposit(e.target.value)}
          placeholder="Enter initial deposit"
        />
      </div>
      <div className="form-group">
        <label>Loan Period (in years)</label>
        <input
          type="number"
          value={loanPeriod}
          onChange={(e) => setLoanPeriod(e.target.value)}
          placeholder="Enter loan period (in years)"
        />
      </div>
      <button onClick={calculateLoan} className="calculate-button">
        Calculate
      </button>
      {loanBreakdown && (
        <div className="loan-breakdown">
          <h3>Loan Breakdown</h3>
          <p>Total Loan: PKR {loanBreakdown.totalLoan}</p>
          <p>Monthly Payment: PKR {loanBreakdown.monthlyPayment.toFixed(2)}</p>
        </div>
      )}
      <Link to="/register">
        <button className="proceed-button">Proceed</button>
      </Link>
    </div>
  );
};

export default Calculator;
