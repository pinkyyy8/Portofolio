import { useState, useEffect } from 'react';

const useAudio = (url: string) => {
  const [audio] = useState<HTMLAudioElement | null>(
    typeof Audio !== 'undefined' ? new Audio(url) : null
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    if (!audio) return;
    
    if (isPlaying) {
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
          })
          .catch(error => {
            // Auto-play was prevented
            console.error("Audio playback failed:", error);
            setIsPlaying(false);
          });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    if (!audio) return;
    
    // Loop the audio
    audio.loop = true;
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return { isPlaying, toggle };
};

export default useAudio;