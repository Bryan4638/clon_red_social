import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Register_and_Login/Login";
import { AuthProvider } from "../src/content/AuthContext";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register_and_Login/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import NavBar from "./Components/Navbar";
import NotFound from "./pages/404NotFound/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route element={< NavBar/>}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
