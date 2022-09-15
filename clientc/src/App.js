import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Book from "./pages/book/Book";

function App() {

  const {user} = useContext(AuthContext)

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home/> : <Register/>}/>
        <Route exact path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
        <Route exact path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
        <Route exact path="/profile/:username" element={<Profile/>}/>
        <Route exact path="/book" element={<Book/>}/>

      </Routes>

    </Router>
  )
}

export default App;
