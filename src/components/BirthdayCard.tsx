import React from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import useAudio from '../hooks/useAudio';
import Confetti from './Confetti';
import Balloons from './Balloons';
import Cake from './Cake';

interface BirthdayCardProps {
  name: string;
  message?: string;
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ 
  name, 
  message = "Wishing you a day filled with happiness and a year filled with joy!"
}) => {
  const { isPlaying, toggle } = useAudio('/birthday-song.mp3');

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden">
      <Confetti />
      <Balloons />
      
      <div className="relative z-10 px-6 py-10 mx-auto text-center bg-white rounded-lg shadow-xl md:px-12 md:py-14 bg-opacity-90 backdrop-blur-sm max-w-2xl">
        <h1 className="mb-2 text-4xl font-bold text-transparent animate-text-shimmer bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 background-animate md:text-6xl">
          Happy Birthday!
        </h1>
        
        <h2 className="mb-6 text-2xl font-bold text-pink-600 md:text-3xl animate-bounce-slow">
          {name}
        </h2>
        
        <p className="mb-8 text-gray-700 md:text-lg animation-fade-in">
          {message}
        </p>
        
        <Cake />
        
        <button
          onClick={toggle}
          className="flex items-center px-4 py-2 mt-8 text-white transition-all rounded-full hover:bg-pink-600 bg-pink-500"
        >
          {isPlaying ? (
            <>
              <VolumeX className="mr-2" size={18} />
              Mute Music
            </>
          ) : (
            <>
              <Volume2 className="mr-2" size={18} />
              Play Music
            </>
          )}
        </button>
      </div>
      
      <div className="absolute bottom-4 right-4 flex items-center text-white text-sm">
        <Music className="mr-1" size={16} />
        <span>Birthday Song</span>
      </div>
    </div>
  );
};

export default BirthdayCard;