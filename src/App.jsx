import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { useState } from "react";
import "./App.css";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Layout from "./components/Layout";
import Profile from "./components/Profile";

function App() {
  const [expenses, setExpenses] = useState([
    {
      id: "59454ecd-0f61-422a-89d9-3213915343f2",
      month: 1,
      date: "2024-01-05",
      item: "식비",
      amount: 100000,
      description: "세광양대창",
    },
  ]);
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser}/>}>
            <Route
              index
              element={<Home expenses={expenses} setExpenses={setExpenses} />}
            />
            <Route
              path="/detail/:id"
              element={<Detail expenses={expenses} setExpenses={setExpenses} />}
            />
            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} />}
            />
          </Route>
          <Route path="/login" element={<LogIn setUser={setUser} />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
