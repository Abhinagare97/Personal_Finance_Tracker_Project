import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";
import Navbar from "../Navbar/navbar";
import Expenses from "../Expense/expense";
import Income from "../Income/income";
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);

  // useEffect(() => {
  //   // Fetch user from localStorage
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const userData = JSON.parse(storedUser);
  //     setUser(userData);
  //     fetchExpenses(userData.userId);
  //   } else {
  //     navigate("/");
  //   }
  // }, [navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      console.log("User Data:", userData); // Debugging
      fetchExpenses(userData.userId);
    } else {
      navigate("/");
    }
  }, [navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  
  const fetchExpenses = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5039/api/Expenses/user/${userId}`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <div>
    <div className="page">

       <div className="all">
       
          <Income/>
          <Expenses/>

        </div>
        
    </div>
    </div>
  );
  
};

export default Dashboard;
