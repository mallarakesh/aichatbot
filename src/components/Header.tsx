
import React from 'react';
import { Plane, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full py-6 px-4 flex justify-between items-center", className)}>
      <div className="flex items-center gap-2">
        <Plane className="text-travel-blue animate-bounce-small" size={28} />
        <h1 className="text-2xl font-bold text-travel-blue">Wanderlust</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-gray-600">
          <MapPin size={18} />
          <span>Your Travel Companion</span>
        </div>
        <div className="flex items-center gap-1 bg-travel-blue text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
          <span className="hidden md:inline-block">Explore</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;
