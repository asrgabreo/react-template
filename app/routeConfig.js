import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  arts: {
    component: HomeContainer,
    ...routeConstants.arts
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
