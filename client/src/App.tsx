import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./Pages/User/ProfilePage"
import Header from "./Components/Header"
import LoginPage from "./Pages/User/Loginpage"
import RegisterPage from "./Pages/User/RegisterPage"
import TourPage from "./Components/Tour/Tour"
import TourDetails from "./Components/Tour/TourDetails"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tours" element={<TourPage />} />
        <Route path="/tours/:id" element={<TourDetails />} />
      </Routes>
    </Router>
  )
}

export default App
