import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Notes from "./pages/Notes"
import Fields from "./pages/Fields"
import FieldPage from "./pages/FieldPage"
import Tournaments from "./pages/Tournaments"
import TournamentPage from "./pages/TournamentPage"
import Profile from "./pages/Profile"
import Owners from "./pages/Owners"
import OwnerProfile from "./pages/OwnerProfile"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/owner/:userId" element={<OwnerProfile />} />
        <Route path="/owners" element={<Owners />} />
        <Route path="/fields" element={<Fields />} />
        <Route path="/fields/:fieldId" element={<FieldPage />} /> 
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/tournaments/:tournamentId" element={<TournamentPage />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
