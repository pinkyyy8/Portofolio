import React, { useState } from 'react';

const Cake: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [message, setMessage] = useState<string | null>(null);
  
  const handleCandleClick = (index: number) => {
    if (candlesLit[index]) {
      const newCandlesLit = [...candlesLit];
      newCandlesLit[index] = false;
      setCandlesLit(newCandlesLit);
      
      // Check if all candles are blown out
      if (newCandlesLit.every(candle => !candle)) {
        setMessage("Your wish has been made! 🎉");
        
        // Reset candles after a while
        setTimeout(() => {
          setCandlesLit([true, true, true]);
          setMessage(null);
        }, 5000);
      }
    }
  };
  
  return (
    <div className="relative mx-auto my-6 w-64 h-56">
      {message && (
        <div className="absolute -top-12 left-0 right-0 text-center text-pink-600 font-bold animation-fade-in">
          {message}
        </div>
      )}
      
      {/* Candles */}
      <div className="absolute flex justify-center space-x-6 w-full top-0">
        {candlesLit.map((isLit, index) => (
          <div 
            key={index} 
            className="relative cursor-pointer"
            onClick={() => handleCandleClick(index)}
          >
            <div className="w-2 h-14 bg-gradient-to-t from-pink-400 to-pink-300 rounded-sm"></div>
            
            {isLit && (
              <>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-to-t from-yellow-400 to-orange-300 rounded-full animate-flame-flicker opacity-80"></div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-5 bg-gradient-to-t from-yellow-300 to-white rounded-full animate-flame-flicker-2"></div>
              </>
            )}
          </div>
        ))}
      </div>
      
      {/* Cake layers */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-24 bg-gradient-to-t from-pink-300 to-pink-200 rounded-t-full"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 bg-gradient-to-t from-pink-400 to-pink-300 rounded-t-full"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-10 bg-gradient-to-t from-pink-600 to-pink-500 rounded-t-full"></div>
      
      {/* Decorations */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i} 
          className="absolute bg-white rounded-full w-3 h-3"
          style={{
            bottom: `${8 + Math.random() * 12}px`,
            left: `${10 + (i * 6) + Math.random() * 4}px`,
          }}
        ></div>
      ))}
      
      {[...Array(8)].map((_, i) => (
        <div 
          key={i} 
          className="absolute bg-yellow-200 rounded-full w-3 h-3"
          style={{
            bottom: `${20 + Math.random() * 12}px`,
            right: `${10 + (i * 6) + Math.random() * 4}px`,
          }}
        ></div>
      ))}
      
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-pink-100 to-pink-200 rounded-t-full"></div>
    </div>
  );
};

export default Cake;