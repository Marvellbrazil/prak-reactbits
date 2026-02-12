import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, Code2 } from 'lucide-react';
import api from '@/API/axios';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Team Members', path: '/admin/members', icon: <Users size={20} /> },
        { name: 'Site Config', path: '/admin/settings', icon: <Settings size={20} /> },
    ];

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } finally {
            localStorage.removeItem('admin_token');
            navigate('/login');
        }
    };

    return (
        <aside className="w-64 h-screen bg-[#03000c] border-r border-white/10 flex flex-col fixed left-0 top-0">
            <div className="p-6 flex items-center gap-3 border-b border-white/10">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <Code2 className="text-white" size={24} />
                </div>
                <span className="font-bold text-xl text-white tracking-tight">AdminPanel</span>
            </div>

            <nav className="flex-grow p-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;