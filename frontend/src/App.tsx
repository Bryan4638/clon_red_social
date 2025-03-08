import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import NotFound404 from "./pages/NotFound404";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import Navbar from "./components/NavBar";
import Home from "./pages/Home/Home";
import ListPost from "./pages/Home/ListPost";
import {Toaster} from 'sonner';
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import PostDetail from "./pages/Home/PostDetail";

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster/>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound404 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<Navbar />}>
                <Route path="/profile" element={<Profile />} />
                <Route element={<Home />}>
                  <Route path="/" element={<ListPost />} />
                   <Route path="/post-detail" element={<PostDetail/>}/>
                {/*<Route path="/post-edit" element={<PostEdit />} /> */}
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
