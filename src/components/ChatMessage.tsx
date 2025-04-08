
import React from 'react';
import { cn } from '@/lib/utils';
import { Plane, Navigation, Coffee, CalendarRange, Utensils } from 'lucide-react';

export type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  category?: 'restaurant' | 'event' | 'tip' | 'general';
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, className }) => {
  const isUser = message.sender === 'user';
  
  const getCategoryIcon = () => {
    if (isUser) return null;
    
    switch (message.category) {
      case 'restaurant':
        return <Utensils className="h-4 w-4 text-travel-teal mr-1" />;
      case 'event':
        return <CalendarRange className="h-4 w-4 text-travel-green mr-1" />;
      case 'tip':
        return <Coffee className="h-4 w-4 text-amber-500 mr-1" />;
      default:
        return <Navigation className="h-4 w-4 text-travel-blue mr-1" />;
    }
  };
  
  return (
    <div className={cn(
      "flex flex-col",
      isUser ? "items-end" : "items-start",
      className
    )}>
      <div className={cn(
        "mb-1 flex items-center text-xs",
        isUser ? "text-gray-500" : "text-gray-600"
      )}>
        {isUser ? (
          <span>You</span>
        ) : (
          <div className="flex items-center">
            <Plane className="h-4 w-4 text-travel-blue mr-1" />
            <span>Wanderlust</span>
          </div>
        )}
      </div>
      
      <div className={isUser ? "chat-bubble-user" : "chat-bubble-ai"}>
        {!isUser && message.category && (
          <div className="flex items-center mb-1 text-xs font-medium">
            {getCategoryIcon()}
            <span className="capitalize">{message.category}</span>
          </div>
        )}
        <p className="text-sm">{message.content}</p>
      </div>
      
      <div className="text-xs text-gray-400 mt-1">
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default ChatMessage;
