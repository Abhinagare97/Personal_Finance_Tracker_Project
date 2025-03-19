import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './income.css'; // Import the CSS file

function Income() {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Show/hide form
  const [newIncome, setNewIncome] = useState({
    userId: 0,
    incomeType: '',
    amount: '',
    date: ''
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [filteredIncomes, setFilteredIncomes] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
      return;
    }

    const userData = JSON.parse(storedUser);
    setNewIncome(prev => ({ ...prev, userId: userData.userId }));

    fetchIncomes();
  }, [navigate]);
  

  const fetchIncomes = async () => {
    try {
      // const responses = await axios.get(`http://localhost:7074/api/Expenses/user/${userData.userId }`);
      // console.log(" >>>>>>>>>>>>>>"+responses.data);
      const response = await axios.get(`http://localhost:5039/api/Incomes`);
      setIncomes(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Error fetching incomes:", err);
    }
  };

  

  const handleChange = (e) => {
    setNewIncome({ ...newIncome, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newIncome.incomeType || !newIncome.amount || !newIncome.date) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      await axios.post('http://localhost:5039/api/Incomes', {
        userId: newIncome.userId,
        incomeType: newIncome.incomeType,
        amount: parseInt(newIncome.amount), 
        date: new Date(newIncome.date).toISOString()
      });

      alert("Income added successfully!");
      setShowForm(false); // Hide form
      fetchIncomes(); // Refresh income list
    } catch (err) {
      console.error("Error adding income:", err);
      alert("Failed to add income.");
    }
  };
  useEffect(() => {
    const filtered = incomes.filter((income) => {
      const incomeDate = new Date(income.date);
      return incomeDate.getMonth() + 1 === parseInt(selectedMonth);
    });
    setFilteredIncomes(filtered);
  }, [selectedMonth, incomes]);
  

  const totalIncome = filteredIncomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className='all'>
    <div className="income-page">
      <div className="income-container">
        <h2 className="income-title">Income List</h2>
        <div className="dropandbtni">
        <button className="add-income-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Income"}
        </button>
        <br/>

       
        <div className="month-selector">
  <label htmlFor="month" className="month-label">Select Month:</label>
  <select
    id="month"
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
    className="styled-select"
  >
    {[...Array(12).keys()].map((i) => (
      <option key={i + 1} value={i + 1}>
        {new Date(0, i).toLocaleString('default', { month: 'long' })}
      </option>
    ))}
  </select>
</div>
</div>


        {showForm && (
          <form className="income-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="incomeType" 
              placeholder="Income Type" 
              value={newIncome.incomeType} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="number" 
              name="amount" 
              placeholder="Amount" 
              value={newIncome.amount} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="datetime-local" 
              name="date" 
              value={newIncome.date} 
              onChange={handleChange} 
              required 
            />
            <button type="submit">Submit</button>
          </form>
        )}

        {loading ? <div>Loading...</div> : error ? <div>Error: {error.message}</div> : (
          <table className="income-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>

       
           
            <tbody>
  {filteredIncomes.map((income) => (
    <tr key={income.id}>
      <td><strong>{income.incomeType}</strong></td>
      <td style={{ color: "white" }}>{new Date(income.date).toLocaleDateString()}</td>
      <td style={{ color: "white" }}>{income.amount.toFixed(2)}</td>
    </tr>
  ))}

              <tr className="total-income-row">
                <td colSpan="2"><strong>Total Income</strong></td>
                <td><strong>{totalIncome.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
  );
}

export default Income;
