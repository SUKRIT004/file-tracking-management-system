import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

import Dashboard from "./pages/Dashboard";
import Files from "./pages/Files";
import FileDetails from "./pages/FileDetails";
import CreateFile from "./pages/CreateFile";
import Barcode from "./pages/Barcode";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";



function AppLayout() {

  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex">

      {!isLoginPage && <Sidebar />}

      <div className="flex-1">

        {!isLoginPage && <Navbar />}

        <main className="p-6">

          <Routes>

            {/* Public Route */}

            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/files"
              element={
                <ProtectedRoute>
                  <Files />
                </ProtectedRoute>
              }
            />

            <Route
              path="/files/:id"
              element={
                <ProtectedRoute>
                  <FileDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateFile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/barcode"
              element={
                <ProtectedRoute>
                  <Barcode />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

          </Routes>

        </main>

      </div>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}