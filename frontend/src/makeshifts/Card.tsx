/* eslint-disable @typescript-eslint/no-unused-vars */
import Magnet from '../components/Magnet'
import PixelTransition from '../components/PixelTransition'
import { Terminal, Layout, PencilRuler, Cpu, Globe, Database, Settings, FolderCode, MonitorCloud } from 'lucide-react'

const getRoleIcon = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes('backend')) return <Settings size={42} className="text-orange-400" />;
    if (r.includes('database')) return <Database size={42} className="text-pink-400" />;
    if (r.includes('frontend')) return <Layout size={42} className="text-blue-500" />;
    if (r.includes('web')) return <Globe size={42} className="text-blue-300" />;
    if (r.includes('ui/ux') || r.includes('designer')) return <PencilRuler size={42} className="text-pink-300" />;
    if (r.includes('cloud')) return <MonitorCloud size={42} className="text-green-400" />;
    if (r.includes('iot')) return <Cpu size={42} className="text-yellow-400" />;
    if (r.includes('software')) return <FolderCode size={42} className="text-yellow-400" />;
    return <Terminal size={42} className="text-white" />;
};

function Card({ src, alt, title, role, link }: {
    src: string;
    alt: string;
    title: string;
    role: string; 
    link: string;
}) {
    return (
        <Magnet padding={40} disabled={false} magnetStrength={15}>
            <div className="relative p-3 bg-[#03000c] rounded-2xl border border-white/10 flex flex-col h-128 w-88 cursor-target overflow-hidden shadow-2xl">
                {/* <div title={role} className="absolute top-4 right-4 z-30 opacity-70 hover:opacity-100 transition-opacity">
                    {getRoleIcon(role)}
                </div> */}
                <img
                    src={`${src}`}
                    alt={alt}
                    className="w-full h-88 object-cover rounded-xl shrink-0 transition-all duration-500"
                />
                <div className="relative grow mt-4 overflow-hidden rounded-lg">
                    <PixelTransition
                        className='w-full h-full'
                        firstContent={
                            <div className="w-full h-full flex flex-col justify-center text-center bg-[#03000c]">
                                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                            </div>
                        }
                        secondContent={
                            <div className="w-full h-full flex flex-col justify-center text-center bg-white">
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