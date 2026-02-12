import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import api from '@/API/axios';
import { Users, Layout, Trophy } from 'lucide-react';
import StatCard from '@/makeshifts/StatCard';

interface Stats {
    totalTeams: number;
    totalMembers: number;
    competitionName: string;
}

const Dashboard = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [admin, setAdmin] = useState<{ username: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // --- Poin 4: Validasi Session ---
                const userRes = await api.get('/user');
                setAdmin(userRes.data);

                // Ambil stats tambahan (Contoh endpoint)
                const teamRes = await api.get('/teams');
                setStats({
                    totalTeams: teamRes.data.data.length,
                    totalMembers: teamRes.data.data.reduce((acc: number, team: any) => acc + team.members.length, 0),
                    competitionName: "Malang Hackathon 2026"
                });
            } catch (err) {
                console.error("Session failed or data fetch error");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-[#03000c] text-white font-mono">
            Initializing System...
        </div>
    );

    return (
        <div className="flex bg-[#05010d] min-h-screen text-white">
            <Sidebar />

            <main className="grow ml-64 p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold">Overview</h1>
                    <p className="text-gray-400 mt-1">Hello, {admin?.username}. Here's what's happening with your hackathon site.</p>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard icon={<Trophy className="text-yellow-400" />} label="Event" value={stats?.competitionName || '-'} />
                    <StatCard icon={<Layout className="text-blue-400" />} label="Batches" value={stats?.totalTeams.toString() || '0'} />
                    <StatCard icon={<Users className="text-purple-400" />} label="Participants" value={stats?.totalMembers.toString() || '0'} />
                </div>

                {/* Info Section */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                    <h2 className="text-xl font-semibold mb-4 text-blue-400">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-left transition-all">
                            <p className="font-bold">Edit Landing Page</p>
                            <p className="text-sm text-gray-400">Update competition name and year</p>
                        </button>
                        <button className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-left transition-all">
                            <p className="font-bold">Manage Members</p>
                            <p className="text-sm text-gray-400">Add or remove members from batches</p>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;