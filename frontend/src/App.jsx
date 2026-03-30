import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Insights from "./pages/Insights";
import Log from "./pages/Log";
import Home from "./pages/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/log"
          element={
            <Layout>
              <Log />
            </Layout>
          }
        />

        <Route
          path="/insights"
          element={
            <Layout>
              <Insights />
            </Layout>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
