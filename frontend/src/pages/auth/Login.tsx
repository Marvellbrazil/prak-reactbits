import { useState, useEffect } from "react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="p-10 bg-black text-white h-screen">
            <div className="mb-4">
                <label htmlFor="username" className="block">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    className="border-2 border-white p-2 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block">Password</label>
                <input 
                    // Trik utamanya di sini: Ganti type berdasarkan state
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    className="border-2 border-white p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="chkShowPassword"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)} 
                />
                <label htmlFor="chkShowPassword">Show Password</label>
            </div>
            
            <button
                className="mt-4 bg-blue-600 px-4 py-2 rounded"
                onClick={
                    e => console.log('a' + e)
                }
            >
                Login
            </button>
        </div>
    )
}

export default Login