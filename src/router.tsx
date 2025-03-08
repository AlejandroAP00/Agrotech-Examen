import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Layout from "./components/layout/Layout";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<PrivateRoute element={
          <Layout>
            <Products />
          </Layout>
        } />} />
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
