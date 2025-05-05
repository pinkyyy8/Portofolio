import React, { useEffect, useState } from 'react';

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speed: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  phase: number;
}

const colors = [
  'from-pink-500 to-pink-600',
  'from-blue-500 to-blue-600',
  'from-yellow-400 to-yellow-500',
  'from-purple-500 to-purple-600',
  'from-green-500 to-green-600',
  'from-red-500 to-red-600',
];

const Balloons: React.FC = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  
  useEffect(() => {
    const initialBalloons: Balloon[] = [];
    
    for (let i = 0; i < 15; i++) {
      initialBalloons.push({
        id: i,
        x: 5 + Math.random() * 90, // Position across 90% of the screen
        y: 110 + Math.random() * 50, // Start below the screen
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 30 + Math.random() * 40,
        speed: 0.1 + Math.random() * 0.3,
        oscillationSpeed: 0.0001 + Math.random() * 0.0008,
        oscillationDistance: 10 + Math.random() * 20,
        phase: Math.random() * 360,
      });
    }
    
    setBalloons(initialBalloons);
  }, []);
  
  useEffect(() => {
    if (balloons.length === 0) return;
    
    const interval = setInterval(() => {
      setBalloons(prevBalloons => 
        prevBalloons.map(balloon => {
          const newPhase = balloon.phase + balloon.oscillationSpeed;
          
          return {
            ...balloon,
            y: balloon.y - balloon.speed,
            x: balloon.x + Math.sin(newPhase) * 0.1,
            phase: newPhase,
          };
        }).filter(balloon => balloon.y > -20) // Remove balloons that have floated too high
      );
    }, 20);
    
    return () => clearInterval(interval);
  }, [balloons]);
  
  const handleBalloonClick = (id: number) => {
    setBalloons(prevBalloons => 
      prevBalloons.filter(balloon => balloon.id !== id)
    );
  };
  
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className={`absolute cursor-pointer pointer-events-auto transition-transform duration-200 hover:scale-110`}
          style={{
            left: `${balloon.x}%`,
            top: `${balloon.y}%`,
            transform: `translateX(-50%) translateY(0) rotate(${Math.sin(balloon.phase) * 3}deg)`,
          }}
          onClick={() => handleBalloonClick(balloon.id)}
        >
          <div 
            className={`relative bg-gradient-to-b ${balloon.color} rounded-full`}
            style={{
              width: `${balloon.size}px`,
              height: `${balloon.size * 1.2}px`,
              boxShadow: 'inset 10px -10px 20px rgba(255, 255, 255, 0.3), inset -10px 10px 20px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div className="absolute bottom-0 left-1/2 w-1 h-6 bg-gray-400 -translate-x-1/2 translate-y-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Balloons;