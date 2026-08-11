import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { DistributorsPage } from './pages/distributors/DistributorsPage';
import { SalesUsersPage } from './pages/sales-users/SalesUsersPage';
import { ProductsPage } from './pages/products/ProductsPage';
import { RequestsPage } from './pages/requests/RequestsPage';

/** Super Admin dashboard routes. */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/distributors" element={<DistributorsPage />} />
        <Route path="/sales-users" element={<SalesUsersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/requests" element={<RequestsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
