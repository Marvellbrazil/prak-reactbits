/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef, useState } from 'react'
import BlurText from '../components/BlurText'
import PixelBlast from '../components/PixelBlast'
import TargetCursor from '../components/TargetCursor'
import Lenis from 'lenis'
// @ts-ignore
import '../index.css'
import SplitText from '../components/SplitText'
import { ArrowDown, Instagram, Loader2 } from 'lucide-react'
import GradualBlur from '../components/GradualBlur'
import Squares from '../components/Squares'
import Card from '../makeshifts/Card'
import { Slide, toast, ToastContainer } from 'react-toastify'
import api from '@/API/axios'
import BGM, { BGMRef } from '@/makeshifts/BGM'
import LetterGlitch from '@/components/LetterGlitch'
import ColorBends from '@/components/ColorBends'

// import { competition_name, year, linkLabel, link } from '../data/StaticData';

const linkIcon = <Instagram className="w-6 h-6 group-hover:translate-y-1 transition-transform" />

interface Team {
    id: number;
    name: string;
    background: string;
    members: TeamMember[];
}

interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
}

interface Config {
    competition_name: string;
    year: number;
    label_link: string;
    link: string;
}

function Home() {
    const scrollContainer = useRef<HTMLDivElement>(null)
    const isScrolling = useRef(false)
    const lenisRef = useRef<Lenis | null>(null);
    const activeSessionIndex = useRef(0);

    const [teams, setTeams] = useState<Team[]>([]);
    const [config, setConfig] = useState<Config | null>(null);

    const [fetching, setFetching] = useState(true);
    const bgmRef = useRef<BGMRef>(null);

    const fetchData = async () => {
        try {
            const [teamRes, configRes] = await Promise.all([
                api.get('/teams'),
                api.get('/config')
            ]);

            setTeams(teamRes.data.data);
            setConfig(configRes.data.data);
        } catch (error) {
            toast.error('Failed to fetch data: ' + error)
        } finally {
            setFetching(false);
        }
    };

    const sectionBackground = (teamBackground: any) => {
        if (teamBackground === 'Squares') {
            return (
                <Squares
                    speed={0.63}
                    squareSize={40}
                    direction='diagonal' // up, down, left, right, diagonal
                    borderColor='#fff'
                    hoverFillColor='#222'
                    hoverColor="#060010"
                    size={50}
                />
            );
        } else if (teamBackground === 'Letter Glitch') {
            return (
                <LetterGlitch
                    glitchSpeed={50}
                    centerVignette={true}
                    outerVignette={true}
                    smooth={true}
                />
            );
        } else {
            return (
                <ColorBends
                    colors={["#F26076", "#FF9760", "#FFD150", "#458B73"]}
                    rotation={-9}
                    speed={0.2}
                    scale={1}
                    frequency={1}
                    warpStrength={0}
                    mouseInfluence={0}
                    parallax={0}
                    noise={0.41}
                    transparent
                    autoRotate={-5}
                />
            );
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const wrapper = scrollContainer.current;
        if (!wrapper || fetching) return;

        const lenis = new Lenis({
            wrapper: wrapper,
            content: wrapper,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        const handleWheel = (e: WheelEvent) => {
            const sections = wrapper.querySelectorAll('section');
            if (sections.length <= 1) return;

            e.preventDefault();
            if (isScrolling.current) return;

            const direction = Math.sign(e.deltaY);
            const targetIndex = activeSessionIndex.current + direction;

            if (targetIndex >= 0 && targetIndex < sections.length) {
                isScrolling.current = true;
                activeSessionIndex.current = targetIndex;
                lenis.scrollTo(sections[targetIndex], {
                    duration: 1.5,
                    lock: true,
                    onComplete: () => { isScrolling.current = false; },
                });
            }
        };

        const triggerAudio = () => {
            bgmRef.current?.playBGM();
            const events = ['wheel', 'mousemove', 'mousedown', 'touchstart', 'keydown'];
            events.forEach(ev => globalThis.removeEventListener(ev, triggerAudio));
        };

        wrapper.addEventListener('wheel', handleWheel, { passive: false });
        const audioEvents = ['wheel', 'mousemove', 'mousedown', 'touchstart', 'keydown'];
        audioEvents.forEach(ev => globalThis.addEventListener(ev, triggerAudio));

        let rfId: number;
        const raf = (time: number) => {
            lenis.raf(time);
            rfId = requestAnimationFrame(raf);
        };
        rfId = requestAnimationFrame(raf);

        return () => {
            wrapper.removeEventListener('wheel', handleWheel);
            audioEvents.forEach(ev => globalThis.removeEventListener(ev, triggerAudio));
            cancelAnimationFrame(rfId);
            lenis.destroy();
        };
    }, [fetching, teams]);

    const goToSection = (direction: 'next' | 'prev') => {
        if (!lenisRef.current || !scrollContainer.current) return;

        if (isScrolling.current) return;

        const sections = scrollContainer.current.querySelectorAll('section');
        const step = direction === 'next' ? 1 : -1;
        const targetIndex = activeSessionIndex.current + step;

        if (targetIndex >= 0 && targetIndex < sections.length) {
            const targetElement = sections[targetIndex];

            isScrolling.current = true;
            activeSessionIndex.current = targetIndex;

            lenisRef.current.scrollTo(targetElement, {
                duration: 1.5,
                lock: true,
                force: true,
                onComplete: () => {
                    isScrolling.current = false;
                },
            });
        }
    };

    if (fetching) return (
        <div className="flex items-center justify-center h-screen bg-[#03000c] text-white font-mono">
            <Loader2 className="animate-spin mr-2" /> Initializing System...
        </div>
    );

    return (
        <div className='bg-[#06000f] text-white overflow-hidden h-screen'>
            <ToastContainer limit={3} position="top-center" theme="dark" transition={Slide} />

            <main ref={scrollContainer} className="h-full w-full overflow-hidden">
                <GradualBlur target='parent' position='top' height='3rem' strength={1} />
                <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn hoverDuration={0.2} />

                <section className="relative h-screen w-full overflow-hidden bg-black grid place-items-center shrink-0 scale-[1.05]">
                    <div className="absolute inset-0 z-0">
                        <PixelBlast variant="square" pixelSize={5} color="#327746" speed={0.75} edgeFade={0.35} transparent />
                    </div>

                    <div className="relative z-10 text-center scale-75 transform-gpu">
                        <div className='place-items-center'>
                            <BlurText text={`SKARIGA ${config?.competition_name} TEAM`} className="cursor-target text-7xl p-4 font-bold border-4 border-transparent hover:border-black hover:bg-white hover:text-black" />
                            <BlurText text={config?.year.toString()} className="cursor-target text-3xl p-4 font-bold border-4 border-transparent hover:border-black hover:bg-white hover:text-black" />
                        </div>
                        <div className='grid grid-cols-2 mt-8 text-2xl'>
                            <div className='cursor-target py-2 place-items-center hover:bg-white border-4 border-transparent hover:border-black hover:text-black' onClick={() => goToSection('next')}>
                                <SplitText className='text-2xl font-semibold' text='Get Started' />
                                <ArrowDown className="w-6 h-6" />
                            </div>
                            <div className='cursor-target place-items-center py-2 hover:bg-white border-4 border-transparent hover:border-black hover:text-black' onClick={() => globalThis.open(config?.link, '_blank')}>
                                <SplitText className='text-2xl font-semibold' text={`${config?.label_link}`} />
                                {linkIcon}
                            </div>
                        </div>
                    </div>
                </section>
                {
                    [...teams].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })).map((team, index) => {
                        return (
                            <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center shrink-0" key={index} id={`section-${index + 1}`}>
                                <div className="absolute inset-0 z-0">
                                    {sectionBackground(team.background)}
                                </div>

                                <div className='relative z-10 text-center scale-[0.70] transform-gpu w-full flex flex-col items-center'>
                                    <h1 className='inline-block cursor-target text-5xl font-semibold p-6 mb-16 backdrop-blur-xs bg-white/5 border-4 border-transparent hover:border-black hover:bg-white hover:text-black'>
                                        {config?.competition_name} {config?.year} Lineup | Batch {index + 1} | {team.name}
                                    </h1>
                                    <div className='flex flex-wrap justify-center gap-16 px-10 max-w-7xl'>
                                        {
                                            [...team.members].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })).map((member, idx) => {
                                                return (
                                                    <Card
                                                        key={idx}
                                                        title={member.name}
                                                        role={member.role}
                                                        src={`http://localhost:8000/storage/members/${member.image}`}
                                                        alt={member.name}
                                                        link=''
                                                    />
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </section>
                        );
                    })
                }
            </main>
        </div>
    )
}

export default Home;