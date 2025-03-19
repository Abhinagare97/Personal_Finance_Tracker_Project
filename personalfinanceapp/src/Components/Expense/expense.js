import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./expenses.css"; // Import the CSS file

const Expenses = () => {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]); // Store filtered expenses
  const [showForm, setShowForm] = useState(false); // Show/hide form
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default: current month

  const [newExpense, setNewExpense] = useState({
    userId: '',
    category: '',
    expenseAmount: '',
    expenseDate: '',
    expenseDescription: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setNewExpense(prev => ({ ...prev, userId: userData.userId }));
      fetchExpenses(userData.userId);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const fetchExpenses = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5039/api/Expenses/user/${userId}`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    const filtered = expenses.filter((expense) => {
      const expenseDate = new Date(expense.expenseDate);
      return expenseDate.getMonth() + 1 === parseInt(selectedMonth);
    });
    setFilteredExpenses(filtered);
  }, [selectedMonth, expenses]);

  const handleChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newExpense.category || !newExpense.expenseAmount || !newExpense.expenseDate) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      await axios.post('http://localhost:5039/api/Expenses', {
        userId: newExpense.userId,
        category: newExpense.category,
        expenseAmount: parseFloat(newExpense.expenseAmount), 
        expenseDate: new Date(newExpense.expenseDate).toISOString(),
        expenseDescription: newExpense.expenseDescription,
        isApproved: true, // Send empty string if missing
        managerComments: "" // Add empty string to avoid validation error
      
      });

      alert("Expense added successfully!");
      setShowForm(false); // Hide form
      fetchExpenses(newExpense.userId); // Refresh expense list
    } catch (err) {
      console.error("Error adding expense:", err);
      alert("Failed to add expense.");
    }
  };

  // Calculate total expense for selected month
  const totalExpense = filteredExpenses.reduce((sum, expense) => sum + expense.expenseAmount, 0);

  return (
    <div className="all">
    <div className="expense-page">
      <div className="expense-container">
        <h3 className="expense-title">Your Expenses</h3>
        <div className="dropandbtn">
        <button className="add-expense-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Expense"}
        </button>

        {/* Dropdown for selecting month */}
       
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
          <form className="expense-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="category" 
              placeholder="Category" 
              value={newExpense.category} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="number" 
              name="expenseAmount" 
              placeholder="Amount" 
              value={newExpense.expenseAmount} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="datetime-local" 
              name="expenseDate" 
              value={newExpense.expenseDate} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="expenseDescription" 
              placeholder="Description (optional)" 
              value={newExpense.expenseDescription} 
              onChange={handleChange} 
            />
            <button type="submit">Submit</button>
          </form>
        )}

        {filteredExpenses.length === 0 ? (
          <p className="no-expenses">No expenses found for this month.</p>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.expenseId}>
                  <td><strong>{expense.category}</strong></td>
                  <td style={{ color: "white" }}>{new Date(expense.expenseDate).toLocaleDateString()}</td>
                  <td style={{ color: "white" }}>{expense.expenseAmount.toFixed(2)}</td>
                  <td style={{ color: "white" }}>{expense.expenseDescription || "N/A"}</td>

                </tr>
              ))}
              <tr className="total-expense-row">
                <td colSpan="2"><strong>Total Expense</strong></td>
                <td><strong>{totalExpense.toFixed(2)}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
  );
};

export default Expenses;