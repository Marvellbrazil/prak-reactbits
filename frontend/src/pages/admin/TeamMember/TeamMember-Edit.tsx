/* eslint-disable react-hooks/exhaustive-deps */
import api from "@/API/axios";
import Footer from "@/makeshifts/Footer";
import Sidebar from "@/makeshifts/Sidebar";
import { ChevronLeft, ImageIcon, Layout, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function TeamMemberEdit() {
    const { teamId, memberId } = useParams<{ teamId: string; memberId: string; }>();

    const [teamName, setTeamName] = useState('');
    const [name, setName] = useState('');
    const [oldName, setOldName] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const fetchMemberData = async () => {
        try {
            const memberRes = await api.get(`/members/${memberId}`);
            const memberData = memberRes.data.data;
            setName(memberData.name);
            setOldName(memberData.name);
            setRole(memberData.role);
            setPreview(memberData.image.startsWith('http') ? memberData.image : import.meta.env.VITE_API_URL + `/storage/members/${memberData.image}`);
        } catch (error) {
            toast.error(`Failed: ${error}`);
        }
    };

    const fetchTeamName = async () => {
        try {
            const teamNameRes = await api.get(`/teams/${teamId}`);
            setTeamName(teamNameRes.data.data.name);
        } catch (error) {
            toast.error(`Failed: ${error}`);
        }
    };

    useEffect(() => {
        fetchMemberData();
        fetchTeamName();
    }, [teamId, memberId, navigate]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdateMember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.length <= 0 || role.length <= 0) {
            toast.warn('Please input all the fields');
            return;
        }

        setLoading(true);

        // using formdata because the payload is containing files that require formdata
        const formData = new FormData();
        formData.append('team_id', teamId!);
        formData.append('name', name);
        formData.append('role', role);

        if (image) formData.append('image', image);

        try {
            const response = await api.put(`/members/${memberId}`, formData, {
                headers: {
                    // tell server that this post is sending file
                    'Content-Type': 'multipart/form-data'
                },
            });

            if (response.data.success) {
                navigate('/admin/teams');
                toast.success(`${oldName} in ${teamName} is successfully updated`);
            }
        } catch (error) {
            toast.error(`Failed to update ${name} in ${teamName}: ${error}`);
        } finally {
            setLoading(false);
        }
    };

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
                                <h1 className="text-2xl font-bold">Update member in the team</h1>
                                <p className="text-gray-400 text-sm">Update member in {teamName}</p>
                            </div>
                        </div>

                        <form onSubmit={handleUpdateMember} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="teamName" className="text-sm font-semibold text-gray-300 ml-1">
                                    Name
                                </label>
                                <input
                                    id="memberName"
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl mt-1 px-6 py-4 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder:text-gray-600"
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="memberRole" className="text-sm font-semibold text-gray-300 ml-1">
                                    Role
                                </label>
                                <input
                                    id="memberRole"
                                    type="text"
                                    placeholder="e.g. Backend Developer or Cloud Engineer"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl mt-1 px-6 py-4 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder:text-gray-600"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            
                            <div className="space-y-2 text-left">
                                <label className="text-sm font-semibold text-gray-300 ml-1">Profile Picture</label>
                                <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <div className="relative w-24 h-24 bg-black/20 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden">
                                        {
                                            preview ? (
                                                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                            ) : (
                                                <ImageIcon className="text-gray-600" size={32} />
                                            )
                                        }
                                    </div>
                                    <div className="grow">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label 
                                            htmlFor="image-upload" 
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl cursor-pointer text-sm font-bold transition-all inline-block"
                                        >
                                            Choose Image
                                        </label>
                                        <p className="text-xs text-gray-500 mt-2">Max size: 2MB (JPG, PNG)</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 transition-all"
                            >
                                {
                                    loading ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Updating...
                                        </span>
                                    ) : (
                                        <>
                                            <RefreshCw size={20} />
                                            <span>Update Member</span>
                                        </>
                                    )
                                }
                            </button>
                        </form>
                    </div>
                </div>
                <Footer/>
            </main>
        </div>
    )
}

export default TeamMemberEdit;