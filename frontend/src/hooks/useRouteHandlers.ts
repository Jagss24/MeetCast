import { useLocation, useNavigate } from 'react-router-dom';
export const useRouteHandlers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const paramsObject = Object.fromEntries(searchParams.entries());

  const navigateTo = ({
    url,
    to,
    remove,
  }: {
    url?: string;
    to?: Record<string, string>;
    remove?: string | string[];
  }) => {
    if (remove) {
      typeof remove === 'string'
        ? searchParams.delete(remove)
        : remove.map((eachUrlKey) => searchParams.delete(eachUrlKey));
    }
    if (to) {
      Object.entries(to).map(([name, value]) => searchParams.set(name, value));
    }
    if (url) navigate({ pathname: url, search: searchParams.toString() });
    else navigate({ search: searchParams.toString() }, { replace: true });
  };

  const route = location.pathname.split('/')[1];
  const subRoute = location.pathname.split('/')[2];

  return { navigate, navigateTo, paramsObject, route, subRoute };
};
