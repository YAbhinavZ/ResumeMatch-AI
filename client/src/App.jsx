import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import AnalysisDetails from "./pages/AnalysisDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/history" element={<History />} />
          <Route
            path="/history/:id"
            element={<AnalysisDetails />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;