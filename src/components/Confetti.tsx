import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  speed: number;
  shape: 'square' | 'circle' | 'triangle';
}

const colors = [
  'bg-pink-500',
  'bg-yellow-400',
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-orange-500',
  'bg-indigo-500',
];

const shapes = ['square', 'circle', 'triangle'];

const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [triggered, setTriggered] = useState(false);
  
  const generateConfetti = (count: number) => {
    const newConfetti: ConfettiPiece[] = [];
    
    for (let i = 0; i < count; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 15,
        rotation: Math.random() * 360,
        speed: 1 + Math.random() * 3,
        shape: shapes[Math.floor(Math.random() * shapes.length)] as 'square' | 'circle' | 'triangle',
      });
    }
    
    setConfetti(newConfetti);
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      generateConfetti(150);
      setTriggered(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!triggered || confetti.length === 0) return;
    
    const animationFrame = requestAnimationFrame(() => {
      setConfetti(prevConfetti => 
        prevConfetti
          .map(piece => ({
            ...piece,
            y: piece.y + piece.speed,
            rotation: piece.rotation + 1,
          }))
          .filter(piece => piece.y < 110) // Remove pieces that are offscreen
      );
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [confetti, triggered]);
  
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
      {confetti.map((piece) => {
        let shape;
        
        if (piece.shape === 'square') {
          shape = (
            <div
              key={piece.id}
              className={`absolute ${piece.color}`}
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                transform: `rotate(${piece.rotation}deg)`,
              }}
            />
          );
        } else if (piece.shape === 'circle') {
          shape = (
            <div
              key={piece.id}
              className={`absolute ${piece.color} rounded-full`}
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
              }}
            />
          );
        } else {
          shape = (
            <div
              key={piece.id}
              className={`absolute ${piece.color}`}
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
                width: 0,
                height: 0,
                borderLeft: `${piece.size / 2}px solid transparent`,
                borderRight: `${piece.size / 2}px solid transparent`,
                borderBottom: `${piece.size}px solid currentColor`,
                transform: `rotate(${piece.rotation}deg)`,
              }}
            />
          );
        }
        
        return shape;
      })}
    </div>
  );
};

export default Confetti;