import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppLoader from './AppLoader';
import Navbar from './components/Navbar/Navbar';
import { useAutoReLogin } from './hooks/useAutoReLogin';
import { Toaster } from 'react-hot-toast';
import { useRouteHandlers } from './hooks/useRouteHandlers';

const AppProvider = () => {
  const { route } = useRouteHandlers();
  const {
    services: { getReLoginUser },
  } = useAutoReLogin({ enableQuery: true });

  if (getReLoginUser?.isLoading) {
    return <AppLoader />;
  }
  return (
    <>
      {route === 'podcast' || route === 'meet' ? <></> : <Navbar />}
      <Suspense fallback={<AppLoader />}>
        <Outlet />
      </Suspense>
      <Toaster position='top-center' reverseOrder={false} />
    </>
  );
};

export default AppProvider;
