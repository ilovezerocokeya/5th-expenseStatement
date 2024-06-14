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
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route path="/" element={<Home user={user} />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route
            path="profile"
            element={<Profile user={user} setUser={setUser} />}
          />
        </Route>
        <Route path="login" element={<LogIn setUser={setUser} />} />
        <Route path="signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
