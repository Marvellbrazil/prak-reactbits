/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import BlurText from '../components/BlurText'
import PixelBlast from '../components/PixelBlast'
import TargetCursor from '../components/TargetCursor'
import Lenis from 'lenis'
// @ts-ignore
import '../index.css'
import SplitText from '../components/SplitText'
import { ArrowDown, Instagram } from 'lucide-react'
import GradualBlur from '../components/GradualBlur'
import LetterGlitch from '../components/LetterGlitch'
import Squares from '../components/Squares'
import ColorBends from '../components/ColorBends'

import BGM, { BGMRef } from '@/makeshifts/BGM'

// Use data/StaticData.ts
import {
    competitionName,
    year,
    linkLabel,
    link,
    batch1TeamName,
    batch1TeamMembers,
    batch2TeamName,
    batch2TeamMembers,
    batch3TeamName,
    batch3TeamMembers,
} from '../data/StaticData';

// Use makeshifts/Card.tsx
import Card from '../makeshifts/Card'

// Vars
const linkIcon = <Instagram className="w-6 h-6 group-hover:translate-y-1 transition-transform" />

// Main Content
function Home() {
    const scrollContainer = useRef<HTMLDivElement>(null)
    const isScrolling = useRef(false)
    const lenisRef = useRef<Lenis | null>(null);
    const activeSessionIndex = useRef(0);

    const bgmRef = useRef<BGMRef>(null);

    useEffect(() => {
        const wrapper = scrollContainer.current;
        if (!wrapper) return;

        // 1. Inisialisasi Lenis
        const lenis = new Lenis({
            wrapper: wrapper,
            content: wrapper,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: false,
            syncTouch: true,
        });

        lenisRef.current = lenis;

        // 2. Fungsi Pemicu Audio (Sekali Jalan)
        const triggerAudio = () => {
            bgmRef.current?.playBGM();
            // Hapus semua listener pemicu setelah audio berhasil/mencoba diputar
            globalThis.removeEventListener('wheel', triggerAudio);
            globalThis.removeEventListener('mousemove', triggerAudio);
            globalThis.removeEventListener('mousedown', triggerAudio);
            globalThis.removeEventListener('touchstart', triggerAudio);
            globalThis.removeEventListener('keydown', triggerAudio);
        };

        // Pasang listener interaksi global
        globalThis.addEventListener('wheel', triggerAudio);
        globalThis.addEventListener('mousemove', triggerAudio);
        globalThis.addEventListener('mousedown', triggerAudio);
        globalThis.addEventListener('touchstart', triggerAudio);
        globalThis.addEventListener('keydown', triggerAudio);

        // 3. Handler Scroll Manual (Wheel)
        const handleWheel = (e: WheelEvent) => {
            // Matikan scroll bawaan browser
            e.preventDefault();

            // Pastikan audio juga terpancing di sini jika listener di atas belum kena
            bgmRef.current?.playBGM();

            // Cek apakah sedang animasi?
            if (isScrolling.current) return;

            const direction = Math.sign(e.deltaY);
            const sectionHeight = globalThis.innerHeight;
            const currentScroll = lenis.scroll;
            const currentIndex = Math.round(currentScroll / sectionHeight);

            const targetIndex = currentIndex + direction;
            const sections = document.querySelectorAll('section');

            if (targetIndex >= 0 && targetIndex < sections.length) {
                isScrolling.current = true;
                activeSessionIndex.current = targetIndex;

                lenis.scrollTo(sections[targetIndex], {
                    duration: 1.5,
                    immediate: false,
                    lock: true,
                    onComplete: () => {
                        isScrolling.current = false;
                    },
                });
            }
        };

        globalThis.addEventListener('wheel', handleWheel, { passive: false });

        // 4. Request Animation Frame untuk Lenis
        let rfId: number;
        function raf(time: number) {
            lenis.raf(time);
            rfId = requestAnimationFrame(raf);
        }
        rfId = requestAnimationFrame(raf);

        // 5. Cleanup saat komponen Unmount
        return () => {
            globalThis.removeEventListener('wheel', handleWheel);
            globalThis.removeEventListener('wheel', triggerAudio);
            globalThis.removeEventListener('mousemove', triggerAudio);
            globalThis.removeEventListener('mousedown', triggerAudio);
            globalThis.removeEventListener('touchstart', triggerAudio);
            globalThis.removeEventListener('keydown', triggerAudio);
            cancelAnimationFrame(rfId);
            lenis.destroy();
        };
    }, []);

    // Navigation Function
    const goToSection = (direction: 'next' | 'prev') => {
        bgmRef.current?.playBGM();
        if (isScrolling.current || !lenisRef.current) return;

        const sections = document.querySelectorAll('section');
        const step = direction == 'next' ? 1 : -1;
        const targetIndex = activeSessionIndex.current + step;

        if (targetIndex >= 0 && targetIndex < sections.length) {
            isScrolling.current = true;
            activeSessionIndex.current = targetIndex;

            lenisRef.current.scrollTo(sections[targetIndex], {
                onComplete: () => {
                    isScrolling.current = false;
                },
            });
        }
    };

    return (
        <div className='bg-[#06000f] text-white'>
            {/* <BGM ref={bgmRef} /> */}
            <main ref={scrollContainer} className="h-screen w-full overflow-hidden no-scrollbar">
                <GradualBlur
                    target='parent'
                    position='top'
                    height='3rem'
                    strength={1}
                    divCount={5}
                    curve='ease-in'
                    exponential
                    opacity={1}
                />

                {/* SECTION 1: HERO (Welcome Page) */}
                <section className="relative h-screen w-full overflow-hidden bg-black grid place-items-center">
                    <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn hoverDuration={0.2} />

                    {/* Background Effect */}
                    <div className="absolute inset-0 z-0">
                        <PixelBlast
                            variant="square"
                            pixelSize={5}
                            color="#327746"
                            patternScale={4.25}
                            patternDensity={1}
                            pixelSizeJitter={0.75}
                            enableRipples
                            rippleSpeed={0.4}
                            rippleThickness={0.12}
                            rippleIntensityScale={1.5}
                            liquid={false}
                            liquidStrength={0.12}
                            liquidRadius={1.2}
                            liquidWobbleSpeed={5}
                            speed={1.25}
                            edgeFade={0.34}
                            transparent
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                        <div className='place-items-center'>
                            <BlurText
                                text={`SKARIGA ${competitionName} TEAM`}
                                delay={200}
                                animateBy="words"
                                direction="top"
                                className="cursor-target text-7xl p-4 font-bold border-4 border-transparent hover:border-black hover:bg-white hover:text-black"
                            />
                            <BlurText
                                text={year.toString()}
                                delay={200}
                                animateBy="words"
                                direction="top"
                                className="cursor-target text-3xl p-4 font-bold border-4 border-transparent hover:border-black hover:bg-white hover:text-black"
                            />
                        </div>
                        <div className='grid grid-cols-2 mt-8 text-2xl'>
                            <button className='cursor-target py-2 place-items-center hover:bg-white border-4 border-transparent hover:border-black hover:text-black'
                                onClick={() => goToSection('next')}>
                                <SplitText
                                    className='text-2xl font-semibold'
                                    text='Get Started'
                                    delay={50}
                                    duration={1}
                                    splitType='chars'
                                    from={{ filter: 'blur(10px)', opacity: 0, y: 40 }}
                                    to={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                                    threshold={0.1}
                                    rootMargin='100px'
                                    textAlign='center'
                                />
                                <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                            </button>
                            <button className='cursor-target place-items-center py-2 hover:bg-white border-4 border-transparent hover:border-black hover:text-black'
                                onClick={() => globalThis.open(link, '_blank')}>
                                <SplitText
                                    className='text-2xl font-semibold'
                                    text={linkLabel}
                                    delay={50}
                                    duration={1}
                                    ease='power3.out'
                                    splitType='chars'
                                    from={{ filter: 'blur(10px)', opacity: 0, y: 40 }}
                                    to={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                                    threshold={0.1}
                                    rootMargin='100px'
                                    textAlign='center'
                                />
                                {linkIcon}
                            </button>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: ABOUT / NEXT CONTENT */}
                <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center">
                    {/* Background Effect */}
                    <div className="absolute inset-0 z-0">
                        <Squares
                            speed={0.63}
                            squareSize={40}
                            direction='diagonal' // up, down, left, right, diagonal
                            borderColor='#fff'
                            hoverFillColor='#222'
                            hoverColor="#060010"
                            size={50}
                        />
                    </div>
                    <div className='relative z-10 text-center'>
                        <h1 className='cursor-target text-5xl font-semibold p-4 mb-20 backdrop-blur-xs bg-white/5 border-4 border-transparent hover:border-black hover:bg-white hover:text-black'>{competitionName} {year} Lineup | Batch I | {batch1TeamName}</h1>
                        <div className='grid grid-cols-3 gap-24'>
                            {
                                batch1TeamMembers.map((member, index) => (
                                    <Card
                                        key={index}
                                        src={member.src}
                                        alt={member.alt}
                                        title={member.title}
                                        role={member.role}
                                        link={member.link}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center">
                    {/* Background Effect */}
                    <div className="absolute inset-0 z-0">
                        <LetterGlitch
                            glitchSpeed={50}
                            centerVignette={true}
                            outerVignette={true}
                            smooth={true}
                        />
                    </div>
                    <div className='relative z-10 text-center'>
                        <h1 className='cursor-target text-5xl font-semibold p-4 mb-20 backdrop-blur-xs bg-white/5 border-4 border-transparent hover:border-black hover:bg-white hover:text-black'>{competitionName} {year} Lineup | Batch II | {batch2TeamName}</h1>
                        <div className='grid grid-cols-3 gap-24'>
                            {
                                batch2TeamMembers.map((member, index) => (
                                    <Card
                                        key={index}
                                        src={member.src}
                                        alt={member.alt}
                                        title={member.title}
                                        role={member.role}
                                        link={member.link}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center">
                    {/* Background Effect */}
                    <div className="absolute inset-0 z-0">
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
                    </div>
                    <div className='relative z-10 text-center'>
                        <h1 className='cursor-target text-5xl font-semibold p-4 mb-20 backdrop-blur-xs bg-white/5 border-4 border-transparent hover:border-black hover:bg-white hover:text-black'>{competitionName} {year} Lineup | Batch III | {batch3TeamName}</h1>
                        <div className='grid grid-cols-3 gap-24'>
                            {
                                batch3TeamMembers.map((member, index) => (
                                    <Card
                                        key={index}
                                        src={member.src}
                                        alt={member.alt}
                                        title={member.title}
                                        role={member.role}
                                        link={member.link}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </section>

                <GradualBlur
                    target='parent'
                    position='bottom'
                    height='3rem'
                    strength={1}
                    divCount={5}
                    curve='ease-in'
                    exponential
                    opacity={1}
                />
            </main>
        </div>
    )
}

export default Home

// debugging console
if (import.meta.env.VITE_CONSOLE_DEBUG == 'true') {
    console.log("CONSOLE DEBUG IS ACTIVE")
    console.log(import.meta.env.VITE_API_URL)
}