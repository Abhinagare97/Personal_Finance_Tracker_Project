import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
      <div>
  <p className="navbar-brand" style={{ color: "white"  }}> 💰 Finance Tracker</p>
</div>
        <ul className="navbar-links">
          <li>
            <button className="navbar-link-button" onClick={() => navigate('/dashboard')}>Dashboard</button>
          </li>
          <li>
            <button className="navbar-link-button" onClick={() => navigate('/income')}>Incomes</button>
          </li>
          <li>
            <button className="navbar-link-button" onClick={() => navigate('/expenses')}>Expenses</button>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <span className="navbar-user">Welcome {user?.userFirstName}!</span>
      
        <button onClick={onLogout} className="logout-btn">Logout</button>
        
      </div>
    </nav>
  );
};

export default Navbar;
