import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';
import { HistoryPage } from './pages/history';
import { ProductPage } from './pages/product';
import { ClientPage } from './pages/client';
import { CategoryPage } from './pages/category'; 
import { ProviderPage } from './pages/provider';
import { Settings } from './components/settings/Settings';
import { PrivateRoute } from './components/PrivateRoute'
import { StatisticsPage } from './pages/Stats/index';



const routes = [
    { path: '/category', element: <PrivateRoute><CategoryPage /></PrivateRoute> },
    { path: '/provider', element: <PrivateRoute><ProviderPage /></PrivateRoute> },
    { path: '/product', element: <PrivateRoute><ProductPage /></PrivateRoute> },
    { path: '/history', element: <PrivateRoute><HistoryPage /></PrivateRoute> },
    { path: '/client', element: <PrivateRoute><ClientPage /></PrivateRoute> },
    { path: '/settings', element: <PrivateRoute><Settings /></PrivateRoute> },
    { path: '/product-stats', element: <PrivateRoute><StatisticsPage /></PrivateRoute> },
    { path: '/auth', element: <Auth /> },
    { path: '/*', element: <PrivateRoute><DashboardPage /></PrivateRoute> }
  ];

export default routes;
