import Magnet from '../components/Magnet'
import PixelTransition from '../components/PixelTransition'
import { Terminal, Layout, PencilRuler, Cpu, Globe, Database, Settings, FolderCode, MonitorCloud } from 'lucide-react'

// Helper untuk memilih ikon berdasarkan role
const getRoleIcon = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes('backend')) return <Settings size={48} className="text-orange-400" />;
    if (r.includes('database')) return <Database size={48} className="text-pink-400" />;
    if (r.includes('frontend')) return <Layout size={48} className="text-blue-500" />;
    if (r.includes('web')) return <Globe size={48} className="text-blue-300" />;
    if (r.includes('ui/ux') || r.includes('designer')) return <PencilRuler size={48} className="text-pink-300" />;
    if (r.includes('system')) return <Settings size={48} className="text-purple-400" />;
    if (r.includes('cloud')) return <MonitorCloud size={48} className="text-green-400" />;
    if (r.includes('iot')) return <Cpu size={48} className="text-yellow-400" />;
    if (r.includes('software')) return <FolderCode size={48} className="text-yellow-400" />;
    return <Terminal size={48} className="text-white" />; // Default icon
};

function Card({ src, alt, title, role, link }: {
    src: string;
    alt: string;
    title: string;
    role: string;
    link: string;
}) {
    return (
        <Magnet padding={50} disabled={false} magnetStrength={20}>
            {/* --- ICON STEMPEL DI POJOK KANAN ATAS --- */}
            <div title={role} className="absolute -top-3 -right-3 z-30 transform rotate-15 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] opacity-80 hover:opacity-100 hover:rotate-0 transition-all duration-300">
                {getRoleIcon(role)}
            </div>

            <div
                className="relative p-4 bg-[#03000c] rounded-2xl border border-white/10 flex flex-col h-96 cursor-target overflow-hidden"
                onClick={() => window.open(link, '_blank')}
            >
                <img
                    src={`/${src}`}
                    alt={alt}
                    className="w-102 h-60 object-cover rounded-xl shrink-0"
                />
                <div className="relative grow mt-4 overflow-hidden">
                    <PixelTransition
                        className='w-full h-full'
                        firstContent={
                            <div className="w-full h-full flex flex-col justify-center text-center bg-[#03000c]">
                                <h2 className="text-xl font-bold">{title}</h2>
                            </div>
                        }
                        secondContent={
                            <div className="w-full h-full flex flex-col justify-center text-center bg-[#FFF]">
                                <h2 className="text-2xl text-[#03000c] font-bold">{role}</h2>
                            </div>
                        }
                        pixelColor='#FFF'
                        animationStepDuration={0.2}
                    />
                </div>
            </div>
        </Magnet>
    )
}

export default Card;