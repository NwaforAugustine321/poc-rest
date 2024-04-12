import Dashboard from '@/screens/dashboard/Dashboard';
import ProtectedRoute from '@/guards/ProtectedRoute';

export default function Screen() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
