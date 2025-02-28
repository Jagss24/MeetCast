import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppLoader from './AppLoader';
import Navigation from './components/shared/Navigation/Navigation';
import { useAutoReLogin } from './hooks/useAutoReLogin';
import { Toaster } from 'react-hot-toast';

const AppProvider = () => {
  const {
    services: { getReLoginUser },
  } = useAutoReLogin({ enableQuery: true });

  if (getReLoginUser?.isFetching || getReLoginUser?.isLoading) {
    return <AppLoader />;
  }
  return (
    <>
      <Navigation />
      <Suspense fallback={<AppLoader />}>
        <Outlet />
      </Suspense>
      <Toaster position='top-center' reverseOrder={false} />
    </>
  );
};

export default AppProvider;
