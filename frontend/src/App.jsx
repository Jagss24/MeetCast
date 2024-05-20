import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useEffect } from "react";

const isAuth = false;
const user = {
  activated: false
};

function AuthHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateFunc = () => {
      if (isAuth && user.activated) {
        navigate("/rooms");
      } else if (isAuth) {
        if (!user.activated) {
          navigate("/activate");
        }
      }
    };

    navigateFunc();
  }, [navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <Navigation />
      <AuthHandler /> {/* This component handles the navigation logic */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/activate"
          element={isAuth && !user.activated ? <Activate /> : <Navigate to="/" />}
        />
        <Route
          path="/rooms"
          element={isAuth && user.activated ? <Rooms /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
