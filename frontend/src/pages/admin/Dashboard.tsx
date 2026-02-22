/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Sidebar from '@/makeshifts/Sidebar';
import api from '@/API/axios';
import { Users, Layout, Trophy } from 'lucide-react';
import StatCard from '@/makeshifts/StatCard';
import Greetings from '@/data/Greetings';
import { Link } from 'react-router-dom';

interface Stats {
    totalTeams: number;
    totalMembers: number;
    competitionName: string;
    year: number;
}

function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [admin, setAdmin] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const username = localStorage.getItem('admin_username');
                setAdmin(username!);

                // Ambil stats tambahan (Contoh endpoint)
                const [teamRes, configRes] = await Promise.all([
                    api.get('/teams'),
                    api.get('/config')
                ]);
                setStats({
                    totalTeams: teamRes.data.data.length,
                    totalMembers: teamRes.data.data.reduce((acc: number, team: any) => acc + team.members.length, 0),
                    competitionName: configRes.data.data?.competition_name,
                    year: configRes.data.data?.year
                });
            } catch (err) {
                console.error("Session failed or data fetch error " + err);
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
                    <div className="flex items-center justify-between border-l-4 border-blue-500 pl-4 mb-4">
                        <h1 className="text-3xl inline-flex font-bold uppercase tracking-wider items-center">
                            Dashboard
                        </h1>
                    </div>
                    <p className="text-gray-400 mt-1"><Greetings />, {admin}. Welcome back to SKARIGA Hackathon Team Webdash.</p>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-11 gap-6 mb-10">
                    <div className='col-span-5'>
                        <StatCard icon={<Trophy className="text-yellow-400" />} label="Event" value={stats?.competitionName + ' ' + stats?.year || '-'} />
                    </div>
                    <div className='col-span-3'>
                        <StatCard icon={<Layout className="text-blue-400" />} label="Batches" value={stats?.totalTeams.toString() || '0'} />
                    </div>
                    <div className='col-span-3'>
                        <StatCard icon={<Users className="text-purple-400" />} label="Participants" value={stats?.totalMembers.toString() || '0'} />
                    </div>
                </div>

                {/* Info Section */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                    <div className="flex items-center justify-between border-l-4 border-blue-500 pl-4 ">
                        <h2 className="text-2xl inline-flex font-bold uppercase tracking-wider items-center">
                            Quick Actions
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <Link to='/admin/teams' className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-left transition-all">
                            <p className="font-bold inline-flex my-auto"><Users className='mr-2' /> Manage Teams and Members</p>
                            <p className="text-sm text-gray-400">Add, edit or remove teams and members from batches</p>
                        </Link>
                        <Link to='/admin/config' className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-left transition-all">
                            <p className="font-bold inline-flex"><Layout className='mr-2' /> Edit Landing Page</p>
                            <p className="text-sm text-gray-400">Update competition name and year</p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;