import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Register_and_Login/Login";
import { AuthProvider } from "../src/content/AuthContext";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register_and_Login/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import NavBar from "./Components/Navbar";
import NotFound from "./pages/404NotFound/NotFound";
import PostEdit from "./pages/Home/Post/PostEdit";
import Listpost from "./pages/Home/Post/Listpost";
import PostDetail from "./pages/Home/Post/PostDetail";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<NavBar />}>
              <Route element={<Home />}>
                <Route path="/" element={<Listpost />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/post-edit" element={<PostEdit />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
