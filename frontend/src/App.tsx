import { Routes, Route } from "react-router-dom"

// Pages
import Home from "./pages/Home"
import Login from "./pages/auth/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/admin" element={<Login/>}/>

      {/* Route Fallback */}
      <Route path="*" element={<body className="bg-black text-white "><h1>404 Not Found</h1></body>}/>
    </Routes>
  )
}

export default App