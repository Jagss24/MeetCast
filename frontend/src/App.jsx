import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from './components/shared/Navigation/Navigation';
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppLoader from "./AppLoader";
import { Toaster } from "react-hot-toast"

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
            <Route path="/" element={<HomePage />} />
            {/* Restricted Route for UnAuthenticated Users */}
            <Route path="/register" element={
              <PrivateRoute isAuth={isAuth} isActivated={user.activated} route="/register">
                <RegisterPage />
              </PrivateRoute>} />
            <Route path="/login" element={
              <PrivateRoute isAuth={isAuth} isActivated={user.activated} route="/login">
                <LoginPage />
              </PrivateRoute>} />

            {/* Restricted Route for Non-Activated Users */}
            <Route path="/activate" element={
              <PrivateRoute isAuth={isAuth} isActivated={user.activated} route="/activate">
                <ActivationPage />
              </PrivateRoute>} />

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
                <ProfilePage user={user} />
              </PrivateRoute>
            } />

            {/* Catch All for 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </Suspense>
    </GoogleOAuthProvider>
  );
}

export default App;

// Component for routes where only authenticated users can access

//But in this they are authenticated but are non-activated they will thrown to activate page
const PrivateRoute = ({ isAuth, isActivated, children, route }) => {
  if (!isAuth) {
    // User is not authenticated
    if (route === "/login" || route === "/register") {
      return children; // Allow access to login and register
    }
    return <Navigate to="/login" />; // Redirect all other routes to login
  }

  if (isAuth && !isActivated) {
    // User is authenticated but not activated
    if (route === "/activate") {
      return children; // Allow access to activation page
    }
    return <Navigate to="/activate" />; // Redirect all other routes to activation page
  }

  if (isAuth && isActivated) {
    // User is authenticated and activated
    if (route === "/login" || route === "/register" || route === "/activate") {
      return <Navigate to="/rooms" />; // Redirect to rooms if trying to access login, register, or activate
    }
    return children; // Allow access to all other routes
  }

  return children;
};


const PublicRoute = () => {
  return children
}

