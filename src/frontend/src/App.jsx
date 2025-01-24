import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Fields from "./pages/Fields"
import FieldPage from "./pages/FieldPage"
import Tournaments from "./pages/Tournaments"
import TournamentPage from "./pages/TournamentPage"
import Owners from "./pages/Owners"
import OwnerProfile from "./pages/OwnerProfile"
import AddField from "./pages/AddField"
import AddTournament from "./pages/AddTournament"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import { googleLogout } from "@react-oauth/google"

function Logout() {
  localStorage.clear()
  googleLogout();

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

        <Route path="/profile"
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>} />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="/register" element={<RegisterAndLogout />} /> */}
        <Route path="/profile/owner/:userId" element={<OwnerProfile />} />
        <Route path="/owners" element={<Owners />} />

        <Route path="/add/field"
          element={
            <ProtectedRoute>
              <AddField />
            </ProtectedRoute>} />

        <Route path="/add/tournament"
        element={
          <ProtectedRoute>
            <AddTournament />
          </ProtectedRoute>} />

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
