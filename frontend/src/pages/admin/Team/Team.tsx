/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Sidebar from '@/makeshifts/Sidebar';
import api from '@/API/axios';
import { Users, Layout, Plus, SquarePen, Trash2, Loader2 } from 'lucide-react';
import StatCard from '@/makeshifts/StatCard';
import { Link } from 'react-router-dom';
import { Confirmation } from '@/makeshifts/Confirmation';
import { toast } from 'react-toastify';

// interfaces
interface Team {
    id: number;
    name: string;
    members: TeamMember[];
}

interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
}

interface Stats {
    totalTeams: number;
    totalMembers: number;
    competitionName: string;
}

const Team = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchTeamsData = async () => {
        try {
            const [teamRes, configRes] = await Promise.all([
                api.get('/teams'),
                api.get('/config')
            ]);

            const teamsData = teamRes.data.data;
            const configData = configRes.data.data;

            setTeams(teamsData);
            setStats({
                totalTeams: teamsData.length,
                totalMembers: teamsData.reduce((acc: number, t: any) => acc + (t.members?.length || 0), 0),
                competitionName: configData.competition_name || configData[0]?.competition_name || "Hackathon"
            });
        } catch (err) {
            toast.error(`Fetch error: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamsData();
    }, []);

    const handleTeamDelete = async (id: number, name: string) => {
        if (await Confirmation({ title: 'Confirm Deletion', confirmation: `Are you sure you want to delete ${name}?`, actionLabel: 'Delete' })) {
            try {
                await api.delete(`/teams/${id}`);
                await fetchTeamsData();
                toast.success(`${name} deleted successfully`);
            } catch (err) {
                toast.error(err as string);
            }
        }
    };

    const handleMemberDelete = async (id: number, name: string, team: string) => {
        if (await Confirmation({ title: 'Confirm Removal', confirmation: `Remove ${name} from ${team}?`, actionLabel: 'Delete' })) {
            try {
                await api.delete(`/members/${id}`);
                await fetchTeamsData();
                toast.success(`${name} removed successfuly from ${team}`);
            } catch (error) {
                toast.error(error as string);
            }
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-[#03000c] text-white font-mono">
            <Loader2 className="animate-spin mr-2" /> Initializing System...
        </div>
    );

    return (
        <div className="flex bg-[#05010d] h-screen overflow-hidden text-white">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 flex flex-col h-screen overflow-y-auto">
                <div className="flex-none">
                    <header className="mb-10">
                        <div className="flex items-center justify-between border-l-4 border-blue-500 pl-4 mb-4">
                            <h1 className="text-3xl inline-flex font-bold uppercase tracking-wider items-center">
                                Team Management
                            </h1>
                        </div>
                        <p className="text-gray-400 mt-1">Manage teams and their members for {stats?.competitionName}</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <StatCard
                            icon={<Layout className="text-blue-400" />}
                            label="Batches"
                            value={stats?.totalTeams.toString() || '0'}
                        />
                        <StatCard
                            icon={<Users className="text-purple-400" />}
                            label="Total Participants"
                            value={stats?.totalMembers.toString() || '0'}
                        />
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <Link to='/admin/teams/create' className='border-2 border-dashed border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 transition-all group'>
                                <div className="bg-white/5 p-2 rounded-xl group-hover:bg-blue-400/10 mb-2">
                                    <Plus size={24} />
                                </div>
                                <span className="text-sm font-bold">Add Teams</span>
                            </Link>
                            <button onClick={() => alert('Bro that\'s VERY DANGEROUS to delete all, that\'s why i don\'t create it')} className='border-2 border-dashed border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-400 transition-all group'>
                                <div className="bg-white/5 p-2 rounded-xl group-hover:bg-blue-400/10 mb-2">
                                    <Trash2 size={24} />
                                </div>
                                <span className="text-sm font-bold">Delete All</span>
                            </button>
                        </div>
                    </div>
                </div>

                {
                    teams.length > 0 ? (
                        <div className="space-y-12 pb-10">
                            {
                                teams.map((team) => {
                                    return (
                                        <div key={team.id} className="space-y-4">
                                            <div className="flex items-center justify-between border-l-4 border-blue-500 pl-4">
                                                <h2 className="text-2xl inline-flex font-bold uppercase tracking-wider items-center">
                                                    {team.name}
                                                    <div className="flex ml-4 gap-2">
                                                        <Link title='Edit Team Name' to={`/admin/teams/${team.id}/edit`} className='text-gray-500 hover:text-yellow-400 transition-colors'>
                                                            <SquarePen size={20} />
                                                        </Link>
                                                        <button
                                                            title='Delete Team'
                                                            onClick={() => handleTeamDelete(team.id, team.name)}
                                                            className='text-gray-500 hover:text-red-400 transition-colors'
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                </h2>
                                                <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/20">
                                                    {team.members.length} Members
                                                </span>
                                            </div>

                                            {/* members */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {
                                                    team.members.map((member) => {
                                                        return (
                                                            <div key={member.id} className="group bg-white/5 border border-white/10 p-5 rounded-3xl hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden">
                                                                <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                                                                <div className="flex items-center gap-4 text-left">
                                                                    <div className="relative flex-none">
                                                                        <img
                                                                            src={member.image.startsWith('http') ? member.image : `http://localhost:8000/storage/members/${member.image}`}
                                                                            alt={member.name}
                                                                            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-blue-500 transition-all" />
                                                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-[#05010d] rounded-full"></div>
                                                                    </div>
                                                                    <div className="overflow-hidden">
                                                                        <h3 className="font-bold text-lg truncate group-hover:text-blue-400 transition-all">{member.name}</h3>
                                                                        <p className="text-gray-400 text-sm font-medium">{member.role}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-4 pt-4 border-t border-white/5 flex gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                                                    <Link title='Edit' to={`/admin/teams/${team.id}/members/${member.id}/edit`} className="text-xs font-semibold text-blue-400 hover:underline">
                                                                        <SquarePen size={20} />
                                                                    </Link>
                                                                    <button title='Delete' className="text-xs font-semibold text-red-400 hover:underline" onClick={() => handleMemberDelete(member.id, member.name, team.name)}>
                                                                        <Trash2 size={20} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }

                                                {
                                                    team.members.length < 6 && (
                                                        <Link to={`/admin/teams/${team.id}/members/create`} className="border-2 border-dashed border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center text-gray-500 hover:text-blue-400 hover:border-blue-400 transition-all group">
                                                            <Plus size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                                                            <span className="text-sm font-bold text-center">Add a member to {team.name}</span>
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ) : (
                        // empty state
                        <div className="flex-1 flex flex-col items-center justify-center bg-white/5 border border-dashed border-white/10 rounded-[3rem] mb-10">
                            <div className="bg-blue-500/10 p-6 rounded-full mb-4">
                                <Layout size={48} className="text-blue-500 opacity-50" />
                            </div>
                                <h3 className="text-xl font-bold">No Teams Registered Yet</h3>
                            <p className="text-gray-400 mt-2 text-center max-w-xs">
                                It seems like there are no batches created for this competition.
                                Start by creating your first team!
                            </p>
                            <Link
                                to="/admin/teams/create"
                                className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20"
                            >
                                Create First Team
                            </Link>
                        </div>
                    )
                }
            </main>
        </div>
    );
};

export default Team;