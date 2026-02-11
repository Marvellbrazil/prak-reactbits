/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import BlurText from './components/BlurText'
import PixelBlast from './components/PixelBlast'
import TargetCursor from './components/TargetCursor'
import Lenis from 'lenis'
// @ts-ignore
import './index.css'
import Magnet from './components/Magnet'
import PixelTransition from './components/PixelTransition'
import SplitText from './components/SplitText'
import { ArrowDown, Github } from 'lucide-react'
import GradualBlur from './components/GradualBlur'
import LetterGlitch from './components/LetterGlitch'
import Squares from './components/Squares'

// useState Example
// const [text, setText] = useState("")
// <input
//   title='Input'
//   type='text'
//   value={text}
//   onChange={e => setText(e.target.value)} />
// <p className='text-blue-100'>Current state: {text}</p>

// Variables
const competitionName = "DeveloperWeek Hackathon"
const year = 2026

// custom card function
function Card({ src, alt, title, description, link }: {
  src: string;
  alt: string;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Magnet padding={50} disabled={false} magnetStrength={20}>
      <div className="p-4 bg-[#03000c] rounded-2xl border border-white/10 flex flex-col h-78.75 cursor-target" onClick={() => window.open(link, '_blank')}>
        <img
          src={`/${src}`}
          alt={alt}
          className="w-96 h-48 object-cover rounded-xl shrink-0"
        />

        <div className="relative grow mt-4 overflow-hidden">
          <PixelTransition
            className='w-full h-full'
            firstContent={
              // Gunakan w-full h-full agar menempati seluruh ruang yang tersedia
              <div className="w-full h-full flex flex-col justify-center text-center bg-[#03000c]">
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
            }
            secondContent={
              <div className="w-full h-full flex flex-col justify-center text-center bg-[#FFF]">
                <h2 className="text-xl text-[#03000c] font-bold">{description}</h2>
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

// Main Content
function App() {
  const scrollContainer = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)
  const lenisRef = useRef<Lenis | null>(null);
  const activeSessionIndex = useRef(0);

  useEffect(() => {
    const wrapper = scrollContainer.current;
    // Pastikan wrapper ada sebelum lanjut
    if (!wrapper) return;

    const lenis = new Lenis({
      wrapper: wrapper, // Element yang di-scroll
      content: wrapper, // Konten di dalamnya
      duration: 1.5,    // Durasi animasi
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function biar smooth
      smoothWheel: false, // Kita matikan smoothWheel bawaan karena kita handle manual
      syncTouch: true,
    });

    lenisRef.current = lenis;

    const handleWheel = (e: WheelEvent) => {
      // 1. Matikan scroll bawaan browser
      e.preventDefault();

      // 2. Cek apakah sedang animasi? Kalau iya, STOP.
      if (isScrolling.current) return;

      // 3. Tentukan arah scroll (1: Bawah, -1: Atas)
      // Gunakan Math.sign agar lebih presisi menangkap gesture trackpad
      const direction = Math.sign(e.deltaY);

      // 4. Hitung kita ada di section nomor berapa SEKARANG
      // Caranya: Posisi Scroll dibagi Tinggi Layar, lalu dibulatkan
      const sectionHeight = window.innerHeight;
      const currentScroll = lenis.scroll; // Posisi scroll saat ini
      const currentIndex = Math.round(currentScroll / sectionHeight);

      // 5. Tentukan target section berikutnya
      const targetIndex = currentIndex + direction;
      const sections = document.querySelectorAll('section');

      // 6. Validasi agar tidak scroll tembus ke minus atau melebihi jumlah section
      if (targetIndex >= 0 && targetIndex < sections.length) {
        isScrolling.current = true; // Kunci pintu
        activeSessionIndex.current = targetIndex;

        lenis.scrollTo(sections[targetIndex], {
          duration: 1.5,
          immediate: false,
          lock: true, // Kunci scroll user selama animasi
          onComplete: () => {
            // Buka kunci setelah animasi selesai
            isScrolling.current = false;
          },
        });
      }
    };

    // Gunakan 'window' agar tangkapan scroll lebih luas
    window.addEventListener('wheel', handleWheel, { passive: false });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      lenis.destroy();
    };
  }, []);

  // Navigation Function
  const goToSection = (direction: 'next' | 'prev') => {
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
              <button className='cursor-target py-2 place-items-center hover:bg-white border-4 border-transparent hover:border-black hover:text-black' onClick={() => goToSection('next')}>
                <SplitText
                  className='font-semibold'
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
              <button className='cursor-target place-items-center py-2 hover:bg-white border-4 border-transparent hover:border-black hover:text-black' onClick={() => window.open('https://github.com/Marvellbrazil', '_blank')}>
                <SplitText
                  className='font-semibold'
                  text='Visit GitHub'
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
                <Github className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
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
            <h1 className='cursor-target text-5xl font-semibold p-4 mb-20 backdrop-blur-xs bg-white/5 border-4 border-transparent hover:border-black hover:bg-white hover:text-black'>{competitionName} {year} Lineup | Batch I</h1>
            <div className='grid grid-cols-3 gap-24'>
              <Card
                src='azra.png'
                alt='Azra | Backend Developer'
                title='Azra Hadi Kusuma'
                description='Backend Developer'
                link='https://github.com/Azra-Hadi-Kusuma'
              />
              <Card
                src='naval.png'
                alt='Nauval | Frontend Developer'
                title='Nauval Abiansyah Tegar'
                description='Frontend Developer'
                link='https://github.com/novalabiansyh13'
              />
              <Card
                src='surya.jpg'
                alt='Surya | Frontend Developer'
                title='Surya Jayanata Wibawa'
                description='Frontend Developer'
                link='https://github.com/SuryaJayanata'
              />
              <Card
                src='zulfan.jpg'
                alt='Zulfan | UI/UX Designer'
                title='Zulfan Maulana Ahmad'
                description='UI/UX Designer'
                link='https://github.com/zulfan-png'
              />
              <Card
                src='gama.jpg'
                alt='Gamaliel | System Administrator'
                title='Gamaliel Andika Aprilian'
                description='System Administrator'
                link='https://github.com/bztine1'
              />
              <Card
                src='dafa2.jpg'
                alt='Dafa | Backend Developer'
                title='Dafa Alzabiy Nazarudin'
                description='Backend Developer'
                link='https://github.com/dafaalz'
              />
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
            <h1 className='cursor-target text-5xl font-semibold p-4 mb-20 backdrop-blur-xs bg-white/5 border-4 border-transparent hover:border-black hover:bg-white hover:text-black'>{competitionName} {year} Lineup | Batch II</h1>
            <div className='grid grid-cols-3 gap-24'>
              <Card
                src='dzulhaq.jpeg'
                alt='Dzulhaq | ??? Developer'
                title='M. Dzulhaq Reza Asrofi'
                description='Game Developer'
                link='https://github.com/Azra-Hadi-Kusuma'
              />
              <Card
                src='hanif.jpeg'
                alt='Hanif | Frontend Developer'
                title='Hanif Abdul Kadir'
                description='Software Engineer'
                link='https://github.com/Azra-Hadi-Kusuma'
              />
              <Card
                src='iqbal.jpeg'
                alt='Iqbal | Database Expert'
                title='Iqbal Arga Martadinata'
                description='Database Expert'
                link='https://github.com/Azra-Hadi-Kusuma'
              />
              <Card
                src='kevin.jpeg'
                alt='Kevin | Frontend Developer'
                title='Kevin Ananda Aditya Pratama'
                description='Frontend Developer'
                link='https://github.com/Azra-Hadi-Kusuma'
              />
              <Card
                src='nawwaldi.jpeg'
                alt='Nawwaldi | Web Developer'
                title='Nawwaldi Setiawan'
                description='Backend Developer'
                link='https://github.com/Azra-Hadi-Kusuma'
              />
              <Card
                src='udin.jpeg'
                alt='Bahruddin | Cloud Engineer'
                title='M. Bahruddin Nauvaldy Maulana'
                description='Cloud Engineer'
                link='https://github.com/Azra-Hadi-Kusuma'
              />
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

export default App
