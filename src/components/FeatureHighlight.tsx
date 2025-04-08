
import React from 'react';
import { MapPin, Utensils, Calendar, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureHighlightProps {
  className?: string;
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({ className }) => {
  const features = [
    {
      icon: <Utensils className="h-6 w-6 text-travel-teal" />,
      title: "Restaurant Finder",
      description: "Discover local cuisine and get personalized restaurant recommendations."
    },
    {
      icon: <Calendar className="h-6 w-6 text-travel-green" />,
      title: "Event Guide",
      description: "Find exciting local events, performances and activities during your stay."
    },
    {
      icon: <Compass className="h-6 w-6 text-travel-blue" />,
      title: "Travel Tips",
      description: "Get insider advice to make the most of your journey and avoid tourist traps."
    },
    {
      icon: <MapPin className="h-6 w-6 text-red-500" />,
      title: "Local Recommendations",
      description: "Explore hidden gems and authentic experiences recommended by locals."
    }
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-3">
            <div className="mr-3">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-gray-800">{feature.title}</h3>
          </div>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureHighlight;
