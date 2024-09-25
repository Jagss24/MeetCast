import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from './components/shared/Navigation/Navigation';
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppLoader from "./AppLoader";

const HomePage = lazy(() => import("./pages/Home/Home"))
const RegisterPage = lazy(() => import("./pages/Register/Register"))
const LoginPage = lazy(() => import("./pages/Login/Login"))
const ActivationPage = lazy(() => import("./pages/Activate/Activate"))
const RoomsPage = lazy(() => import("./pages/Rooms/Rooms"))
const SingleRoomPage = lazy(() => import("./pages/Room/Room"))
const ProfilePage = lazy(() => import("./pages/Profile/Profile"))
const NotFoundPage = lazy(() => import("./components/NotFound"))

function App({ isAuth, user }) {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Suspense fallback={<AppLoader />}>
        <Router>
          <Navigation />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Restricted Route for Non-Activated Users */}
            <Route path="/activate" element={!isAuth ? <Navigate to="/login" /> : !user.activated ? <ActivationPage /> : <Navigate to="/rooms" />} />

            {/* Private Routes for Authenticated and Activated Users */}
            <Route path="/rooms" element={
              <PrivateRoute isAuth={isAuth} isActivated={user.activated}>
                <RoomsPage />
              </PrivateRoute>
            } />
            <Route path="/room/:id" element={
              <PrivateRoute isAuth={isAuth} isActivated={user.activated}>
                <SingleRoomPage />
              </PrivateRoute>
            } />
            <Route path="/profile/:userName" element={
              <PrivateRoute isAuth={isAuth} isActivated={user.activated}>
                <ProfilePage />
              </PrivateRoute>
            } />

            {/* Catch All for 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Suspense>
    </GoogleOAuthProvider>
  );
}

export default App;

// Component for routes where only authenticated users can access

//But in this they are authenticated but are non-activated they will thrown to activate page
const PrivateRoute = ({ isAuth, isActivated, children }) => {
  console.log({ isAuth, isActivated })
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (isAuth && !isActivated) {
    return <Navigate to="/activate" />;
  }

  return children;
};

