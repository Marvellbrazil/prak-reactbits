/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Sidebar from '@/makeshifts/Sidebar';
import api from '@/API/axios';
import { Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

function Config() {
    const [competitionName, setCompetitionName] = useState('');
    const [year, setYear] = useState(0);
    const [labelLink, setLabelLink] = useState('');
    const [link, setLink] = useState('');

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchConfigData = async () => {
        try {
            const configRes = await api.get('/config');
            const configData = configRes.data.data;

            setCompetitionName(configData.competition_name);
            setYear(configData.year);
            setLabelLink(configData.label_link);
            setLink(configData.link);

        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setFetching(false);
        }
    };

    const handleUpdateConfig = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (competitionName.length <= 0 || labelLink.length <= 0) {
            toast.warn('Please input all the fields');
            return;
        }

        if (year.toString().length !== 4) {
            toast.warn('Please input a valid 4-digit year');
            return;
        }

        setLoading(true);


        try {
            const response = await api.put('/config/1', {
                competition_name: competitionName,
                year: year,
                label_link: labelLink,
                link: link
            });

            if (response.data.success) {
                toast.success('Configuration updated succesfully');
            }
        } catch (error) {
            toast.error(`Update process failed: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchConfigData();
    }, []);

    if (fetching) return (
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
                                Web Configurations
                            </h1>
                        </div>
                        <p className="text-gray-400 mt-1">Configure the website for the display</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <form onSubmit={handleUpdateConfig} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="competitionName" className="text-sm font-semibold text-gray-300 ml-1">
                                    Competition Name
                                </label>
                                <input
                                    id="competitionName"
                                    type="text"
                                    placeholder="Enter competition name"
                                    value={competitionName}
                                    onChange={(e) => setCompetitionName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder:text-gray-600"
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="year" className="text-sm font-semibold text-gray-300 ml-1">
                                    Year
                                </label>
                                <input
                                    id="year"
                                    type="number"
                                    placeholder="Enter a year"
                                    value={year}
                                    onChange={ (e) => {
                                        if (e.target.value.length <= 4) {
                                            setYear(Number.parseInt(e.target.value));
                                        }
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder:text-gray-600"
                                    required
                                    maxLength={4}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="labelLink" className="text-sm font-semibold text-gray-300 ml-1">
                                    Label for Link
                                </label>
                                <input
                                    id="labelLink"
                                    type="text"
                                    placeholder="Enter label for link"
                                    value={labelLink}
                                    onChange={(e) => setLabelLink(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder:text-gray-600"
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="labelLink" className="text-sm font-semibold text-gray-300 ml-1">
                                    Link
                                </label>
                                <input
                                    id="link"
                                    type="text"
                                    placeholder="Enter Link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
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
                                        <span>Update Configuration</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Config;