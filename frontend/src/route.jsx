import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppProvider from './AppProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const HomePage = lazy(() => import('./pages/Home/Home'));
const RegisterPage = lazy(() => import('./pages/Register/Register'));
const LoginPage = lazy(() => import('./pages/Login/Login'));
const ActivationPage = lazy(() => import('./pages/Activate/Activate'));
const RoomsPage = lazy(() => import('./pages/Rooms/Rooms'));
const SingleRoomPage = lazy(() => import('./pages/Room/SingleRoom'));
const ProfilePage = lazy(() => import('./pages/Profile/Profile'));
const NotFoundPage = lazy(() => import('./components/NotFound'));
const PodCastPage = lazy(() => import('./components/Podcast/Podcast'));
const MeetPage = lazy(() => import('./components/Meet/Meet'));

const baseRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AppProvider />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/register',
        element: (
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <RegisterPage />
          </GoogleOAuthProvider>
        ),
      },
      {
        path: '/login',
        element: (
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <LoginPage />
          </GoogleOAuthProvider>
        ),
      },
      { path: '/activate', element: <ActivationPage /> },
      { path: '/rooms', element: <RoomsPage /> },
      { path: '/room/:id', element: <SingleRoomPage /> },
      { path: '/room/podcast/:id', element: <PodCastPage /> },
      { path: '/room/meet/:id', element: <MeetPage /> },
      { path: '/profile/:userName', element: <ProfilePage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />, // Handle 404 separately
  },
]);

export { baseRoutes };
