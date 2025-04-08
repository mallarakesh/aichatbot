
import React from 'react';
import { Utensils, CalendarRange, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuickSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  className?: string;
}

const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({ 
  onSuggestionClick,
  className 
}) => {
  const suggestions = [
    { icon: <Utensils className="h-4 w-4" />, text: "Best restaurants nearby", color: "bg-travel-light-teal text-travel-teal hover:bg-travel-teal hover:text-white" },
    { icon: <CalendarRange className="h-4 w-4" />, text: "Events this weekend", color: "bg-travel-light-green text-travel-green hover:bg-travel-green hover:text-white" },
    { icon: <Coffee className="h-4 w-4" />, text: "Local travel tips", color: "bg-travel-beige text-amber-600 hover:bg-amber-500 hover:text-white" }
  ];

  return (
    <div className={cn("flex flex-wrap gap-2 justify-center mt-4", className)}>
      {suggestions.map((suggestion, index) => (
        <Button 
          key={index}
          variant="outline"
          className={cn(
            "rounded-full flex items-center gap-2 border-none transition-colors",
            suggestion.color
          )}
          onClick={() => onSuggestionClick(suggestion.text)}
        >
          {suggestion.icon}
          <span>{suggestion.text}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickSuggestions;
