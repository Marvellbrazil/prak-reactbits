// components/BGM.tsx
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export interface BGMRef {
  playBGM: () => void;
}

const BGM = forwardRef<BGMRef>((_props, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music/bgm2.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.1;
  }, []);

  useImperativeHandle(ref, () => ({
    playBGM: () => {
      if (audioRef.current?.paused) {
        audioRef.current.play().catch(err => console.error("Play failed:", err));
      }
    }
  }));

  return null;
});

export default BGM;