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
    period: '3 years'
  },
  home: {
    subcategories: ['Structure', 'Finishing', 'Loan'],
    maxLoan: '10 Lakh',
    period: '5 years'
  },
  business: {
    subcategories: ['Buy Stall', 'Advance Rent for Shop', 'Shop Assets', 'Shop Machinery'],
    maxLoan: '10 Lakh',
    period: '5 years'
  },
  education: {
    subcategories: ['University Fees', 'Child Fees Loan'],
    maxLoan: 'Based on requirement',
    period: '4 years'
  }
};

const Calculator: React.FC = () => {
  const [category, setCategory] = useState<string>('');
  const [subcategory, setSubcategory] = useState<string>('');
  const [initialDeposit, setInitialDeposit] = useState<number>(0);
  const [loanPeriod, setLoanPeriod] = useState<number>(0);
  const [loanBreakdown, setLoanBreakdown] = useState<LoanBreakdown | null>(null);

  const calculateLoan = (): void => {
    const totalLoan = initialDeposit * 2; // Example: loan is twice the initial deposit
    const monthlyPayment = totalLoan / (loanPeriod * 12);

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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="wedding">Wedding Loans</option>
          <option value="home">Home Construction Loans</option>
          <option value="business">Business Startup Loans</option>
          <option value="education">Education Loans</option>
        </select>
      </div>
      <div className="form-group">
        <label>Subcategory</label>
        <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
          <option value="">Select Subcategory</option>
          {category && loanCategories[category].subcategories.map((subcat, index) => (
            <option key={index} value={subcat}>{subcat}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Initial Deposit</label>
        <input 
          type="number" 
          value={initialDeposit} 
          onChange={(e) => setInitialDeposit(Number(e.target.value))}
          placeholder="Initial Deposit"
        />
      </div>
      <div className="form-group">
        <label>Loan Period (in years)</label>
        <input 
          type="number" 
          value={loanPeriod} 
          onChange={(e) => setLoanPeriod(Number(e.target.value))}
          placeholder="Loan Period (in years)"
        />
      </div>
      <button onClick={calculateLoan}>Calculate</button>
      {loanBreakdown && (
        <div className="loan-breakdown">
          <h3>Loan Breakdown</h3>
          <p>Total Loan: PKR {loanBreakdown.totalLoan}</p>
          <p>Monthly Payment: PKR {loanBreakdown.monthlyPayment.toFixed(2)}</p>
        </div>
      )}
      <Link to="/register">
        <button>Proceed</button>
      </Link>
    </div>
  );
};

export default Calculator;