import { Navigate, Route, Routes } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/user-profile"
        element={
          <Layout>
            <UserProfilePage />
          </Layout>
        }
      />
      <Route
        path="/tasks"
        element={
          <Layout>
            <TasksPage />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default AppRoutes;
