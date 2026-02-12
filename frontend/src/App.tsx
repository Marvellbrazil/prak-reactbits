import { Routes, Route } from "react-router-dom"

// Pages
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import ProtectedRoute from "./makeshifts/ProtectedRoute"
import Dashboard from "./pages/admin/Dashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/admin" element={<Login/>}/>

      {/* Protected Route */}
      <Route element={<ProtectedRoute/>} >
        <Route path="/admin/dashboard" element={<Dashboard/>} />
      </Route>

      {/* Route Fallback */}
      <Route path="*" element={<body className="bg-black text-white "><h1>404 Not Found</h1></body>}/>
    </Routes>
  )
}

export default App