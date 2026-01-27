import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./pages/Register"
import Inventory from "./pages/Inventory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/inventory" element={<Inventory />} />
    </Routes>
  );
}

export default App;
