import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppLoader from './AppLoader';
import Navbar from './components/Navbar/Navbar';
import { useAutoReLogin } from './hooks/useAutoReLogin';
import { Toaster } from 'react-hot-toast';

const AppProvider = () => {
  const {
    services: { getReLoginUser },
  } = useAutoReLogin({ enableQuery: true });

  if (getReLoginUser?.isLoading) {
    return <AppLoader />;
  }
  return (
    <>
      <Navbar />
      <Suspense fallback={<AppLoader />}>
        <Outlet />
      </Suspense>
      <Toaster position='top-center' reverseOrder={false} />
    </>
  );
};

export default AppProvider;
