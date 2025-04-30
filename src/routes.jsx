import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';
import {HistoryPage} from './pages/history';
import {ProductPage} from './pages/product';
import {ClientPage} from './pages/client';
import { CategoryPage } from './pages/category'; 
import { ProviderPage } from './pages/provider';

const routes = [
    {path: '/auth/category', element: <CategoryPage />},
    {path: '/auth/provider', element: <ProviderPage />},
    {path: '/auth/history', element: <HistoryPage />},
    {path: '/auth/product', element: <ProductPage />},
    {path: '/auth/client', element: <ClientPage />},
    {path: '/auth', element: <Auth />},
    {path: '/*', element: <DashboardPage />}
]

export default routes