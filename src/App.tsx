import React, { useState, useEffect } from 'react';
import BirthdayCard from './components/BirthdayCard';
import { Cake, Heart } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('Dear Friend');
  
  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="flex items-center space-x-2 mb-4">
          <Heart className="text-pink-500 animate-pulse" size={24} />
          <Cake className="text-pink-600 animate-bounce-slow" size={32} />
          <Heart className="text-pink-500 animate-pulse" size={24} />
        </div>
        <p className="text-pink-600 font-medium text-lg animate-pulse">
          Preparing your celebration...
        </p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <BirthdayCard name={name} />
    </div>
  );
}

export default App;