/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Sidebar from "@/makeshifts/Sidebar";
import api from "@/API/axios";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Layout, Loader2, RefreshCw } from "lucide-react";
import Footer from "@/makeshifts/Footer";
import { toast } from "react-toastify";

function TeamEdit() {
    const { id } = useParams<{ id: string }>(); // take id from URL
    const [teamName, setTeamName] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [oldTeamName, setOldTeamName] = useState('');

    const navigate = useNavigate();

    const fetchTeamData = async () => {
        try {
            const teamRes = await api.get(`/teams/${id}`);
            const teamData = teamRes.data.data;
            
            setTeamName(teamData.name);
            setOldTeamName(teamData.name);
        } catch (error) {
            navigate('/admin/teams');
            toast.error(`Team not found! ${error}`);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchTeamData();
    }, [id, navigate]);

    const handleUpdateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (teamName.length < 3) {
            toast.warn('Team Name should be at least 3 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await api.put(`/teams/${id}`, {
                name: teamName
            });

            if (response.data.success) {
                navigate('/admin/teams');
                toast.success(`${oldTeamName} updated successfully!`);
            }
        } catch (error) {
            toast.error(`Update process failed: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    if (fetching) return (
        <div className="flex items-center justify-center h-screen bg-[#03000c] text-white">
            <Loader2 className="animate-spin mr-2" /> Initializing Data...
        </div>
    );

    return (
        <div className="flex bg-[#05010d] min-h-screen text-white">
            <Sidebar />

            <main className="grow ml-64 p-8 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back</span>
                    </button>
                </div>

                <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 blur-[100px]"></div>

                    <div className="relative">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-blue-600/20 p-3 rounded-2xl">
                                <Layout className="text-blue-400" size={28} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Edit Team</h1>
                            </div>
                        </div>

                        <form onSubmit={handleUpdateTeam} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="teamName" className="text-sm font-semibold text-gray-300 ml-1">
                                    Team / Batch Name
                                </label>
                                <input
                                    id="teamName"
                                    type="text"
                                    placeholder="Enter new team name"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder:text-gray-600"
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 transition-all"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Updating...
                                    </span>
                                ) : (
                                    <>
                                        <RefreshCw size={20} />
                                        <span>Update Team</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
                <Footer/>
            </main>
        </div>
    )
}

export default TeamEdit;