
import React, { useState } from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import QuickSuggestions from '@/components/QuickSuggestions';
import FeatureHighlight from '@/components/FeatureHighlight';
import { Plane, MapPin } from 'lucide-react';

const Index = () => {
  const [chatInput, setChatInput] = useState('');
  
  const handleSuggestionClick = (suggestion: string) => {
    setChatInput(suggestion);
    // We'll pass this to the ChatInterface to set the input
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Plane className="text-travel-blue" size={24} />
            <h1 className="text-3xl font-bold text-gray-800">Wanderlust AI Travel Companion</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your personal AI assistant for discovering the best restaurants, events, and insider tips 
            for your next adventure. Just ask and let Wanderlust guide your journey!
          </p>
          
          <QuickSuggestions 
            onSuggestionClick={handleSuggestionClick}
            className="mt-4" 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="text-travel-blue" />
                <h2 className="font-semibold text-lg">How Can I Help You?</h2>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Ask me questions like:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-travel-teal"></div>
                  <span>"Where should I eat in Barcelona?"</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-travel-green"></div>
                  <span>"What events are happening in Tokyo this weekend?"</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span>"Give me tips for traveling in Rome"</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-travel-blue"></div>
                  <span>"What should I pack for a trip to Norway?"</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-md">
              <h2 className="font-semibold text-lg mb-3">Popular Destinations</h2>
              <div className="space-y-2">
                {['Paris', 'Tokyo', 'New York', 'Barcelona', 'Bali'].map((city, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 p-2 rounded hover:bg-travel-light-blue cursor-pointer transition-colors"
                    onClick={() => handleSuggestionClick(`Tell me about ${city}`)}
                  >
                    <MapPin className="h-4 w-4 text-travel-blue" />
                    <span className="text-gray-700">{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Your Ultimate Travel Companion</h2>
          <FeatureHighlight />
        </div>
      </main>
      
      <footer className="bg-travel-blue text-white py-4 mt-10">
        <div className="container text-center text-sm">
          <p>© 2025 Wanderlust AI Travel Companion. Your journey, simplified.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
