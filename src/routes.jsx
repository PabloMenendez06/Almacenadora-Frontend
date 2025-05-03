import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';
import {HistoryPage} from './pages/history';
import {ProductPage} from './pages/product';
import {ClientPage} from './pages/client';
import { CategoryPage } from './pages/category'; 
import { ProviderPage } from './pages/provider';
import { Settings } from './components/settings/Settings';


const routes = [
    {path: '/category', element: <CategoryPage />},
    {path: '/provider', element: <ProviderPage />},
    {path: '/product', element: <ProductPage/>},
    {path: '/history', element: <HistoryPage />},
    {path: '/product', element: <ProductPage />},
    {path: '/client', element: <ClientPage />},
    {path: '/auth', element: <Auth />},
    { path: '/settings', element: <Settings /> },
    {path: '/*', element: <DashboardPage />}
]

export default routes