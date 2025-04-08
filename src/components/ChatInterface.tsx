
import React, { useState, useRef, useEffect } from 'react';
import { Send, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import ChatMessage, { MessageType } from './ChatMessage';
import { cn } from '@/lib/utils';

// Sample response data for demonstration purposes
const sampleRestaurants = [
  "For authentic Italian cuisine, try Bella Napoli. Their wood-fired pizzas and homemade pasta are incredible!",
  "If you're looking for local flavors, check out Harbor House. They serve fresh seafood with amazing ocean views.",
  "A hidden gem is Green Garden - it's a vegetarian place with dishes so good even non-vegetarians love it!",
  "For a special occasion, The Grand Table offers a luxurious dining experience with a 5-course tasting menu."
];

const sampleEvents = [
  "There's a local wine festival this weekend at the central plaza with tastings from regional vineyards.",
  "Don't miss the sunrise yoga session at Ocean Beach every morning at 7 AM - it's perfect for travelers!",
  "The historical walking tour starts at 10 AM from the town square - a great way to learn about local history.",
  "This Friday evening, there's a live music performance at Moonlight Bar featuring local jazz musicians."
];

const sampleTips = [
  "Always carry a reusable water bottle. Many tourist spots have refill stations to keep you hydrated.",
  "The local buses run every 15 minutes and are a great way to see the city without spending too much.",
  "Most museums offer free entry on the first Sunday of each month if you're traveling on a budget.",
  "The best time to visit the famous viewpoint is during sunset - but arrive 30 minutes early to get a good spot!",
  "Download the city's offline map - it works without internet and marks all the important landmarks."
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI travel companion. How can I assist with your journey today? Ask me about restaurants, events, or travel tips for your destination!",
      sender: 'ai',
      category: 'general',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const generateResponse = (userMessage: string): Promise<MessageType> => {
    return new Promise((resolve) => {
      // Simulate processing time
      setTimeout(() => {
        const lowerCaseMessage = userMessage.toLowerCase();
        let response: MessageType;

        if (lowerCaseMessage.includes('restaurant') || lowerCaseMessage.includes('eat') || lowerCaseMessage.includes('food') || lowerCaseMessage.includes('dining')) {
          response = {
            id: Date.now().toString(),
            content: sampleRestaurants[Math.floor(Math.random() * sampleRestaurants.length)],
            sender: 'ai',
            category: 'restaurant',
            timestamp: new Date()
          };
        } else if (lowerCaseMessage.includes('event') || lowerCaseMessage.includes('show') || lowerCaseMessage.includes('happening') || lowerCaseMessage.includes('activities')) {
          response = {
            id: Date.now().toString(),
            content: sampleEvents[Math.floor(Math.random() * sampleEvents.length)],
            sender: 'ai',
            category: 'event',
            timestamp: new Date()
          };
        } else if (lowerCaseMessage.includes('tip') || lowerCaseMessage.includes('advice') || lowerCaseMessage.includes('suggestion') || lowerCaseMessage.includes('recommend')) {
          response = {
            id: Date.now().toString(),
            content: sampleTips[Math.floor(Math.random() * sampleTips.length)],
            sender: 'ai',
            category: 'tip',
            timestamp: new Date()
          };
        } else {
          response = {
            id: Date.now().toString(),
            content: "I can help with restaurant recommendations, local events, and travel tips. Could you specify which of these you're looking for?",
            sender: 'ai',
            category: 'general',
            timestamp: new Date()
          };
        }

        resolve(response);
      }, 1000); // Simulate a 1 second delay
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    try {
      // Generate AI response
      const aiResponse = await generateResponse(input);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isProcessing && (
          <div className="chat-bubble-ai flex items-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <span className="text-sm">Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="input-container">
        <div className="flex items-center gap-2">
          <MapPin className="text-travel-blue h-5 w-5 ml-1" />
          <Input
            placeholder="Ask about restaurants, events, or travel tips..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="border-2 border-gray-200 rounded-full py-2 pl-3 pr-10 focus-visible:ring-travel-blue"
            disabled={isProcessing}
          />
          <Button 
            className={cn(
              "rounded-full bg-travel-blue hover:bg-blue-700 transition-colors",
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            )}
            onClick={handleSendMessage}
            disabled={isProcessing || !input.trim()}>
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
