import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useEffect } from "react";
import { useSelector } from "react-redux";



function AuthHandler({ isAuth, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateFunc = () => {
      if (isAuth && user?.activated) {
        navigate(`/rooms?user=${user?.id}`);
      } else if (isAuth) {
        if (!user?.activated) {
          navigate(`/activate?user=${user?.id}`);
        }
      }
    };

    navigateFunc();
  }, [navigate, isAuth, user?.activated, user?.id]);

  return null;
}

function App() {
  const { isAuth, user } = useSelector(state => state.user)
  return (
    <Router>
      <Navigation />
      <AuthHandler isAuth={isAuth} user={user} /> {/* This component handles the navigation logic */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/activate"
          element={<Activate />}
        />
        <Route
          path="/rooms"
          element={<Rooms />}
        />
      </Routes>
    </Router>
  );
}

export default App;
