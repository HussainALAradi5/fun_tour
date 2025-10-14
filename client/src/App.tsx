import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./Pages/User/ProfilePage"
import Header from "./Components/Header"
import "./styles/App.css"
import LoginPage from "./Pages/User/Loginpage"
import RegisterPage from "./Pages/User/RegisterPage"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
