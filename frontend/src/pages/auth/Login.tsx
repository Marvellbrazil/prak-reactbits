import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/API/axios";


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        // to prevent refresh on submit
        e.preventDefault();

        if (username.length <= 0 || password.length <= 0) {
            alert('Please input all the fields');
            return;
        }
        
        // change loading state to true to indicates the login process is running
        setLoading(true);

        try {
            // send request to API in AuthController
            const response = await api.post('/login', {
                username: username,
                password: password,
            });

            // catch response after POST
            // success type is boolean
            if (response.data.success) {
                // save token to localStorage
                localStorage.setItem('admin_token', response.data.token);

                // redirect to admin dashboard
                alert('Login Success');
                navigate('/admin/dashboard');
            }
        } catch (error: any) {
            // catch error for rescode in 400 until 499 from API
            alert('Login Failed ' + error.response?.data?.message || 'try again later');
        } finally {
            // set loading state to false
            // to indicate the login process is done
            // wether its succeed or not
            setLoading(false);
        }
    }

    return (
        <div className="p-10 bg-black text-white h-screen">
            <form onSubmit={handleLogin}>
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
                type="submit"
                className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-800"
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
            </form>
        </div>
    )
}

export default Login;