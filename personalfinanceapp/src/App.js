import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/login";
import Register from "./Components/Login/Register";
import Dashboard from "./Components/Dashboard/dashboard";
import Income from "./Components/Income/income";
import Expenses from "./Components/Expense/expense";
import Navbar from "./Components/Navbar/navbar";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };
  

  return (
    <div className="App">
      {user && <Navbar user={user} onLogout={handleLogout} />} {/* Show Navbar only if user is logged in */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </div>
  );
}

function Root() {
  return (

    
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Root;
