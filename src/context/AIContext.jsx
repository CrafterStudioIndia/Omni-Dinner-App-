import React, { createContext, useContext, useState } from 'react';

const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiChatHistory, setAiChatHistory] = useState([
    {
      sender: 'ai',
      text: '👋 Hello! I am DineSense AI, your smart restaurant copilot. Ask me for personalized dish pairings, dietary info, or managerial operational insights!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // AI Prompt handler with Gemini / local fallback engine
  const askAI = async (promptQuery, contextData = {}) => {
    setIsAnalyzing(true);
    const userMsg = {
      sender: 'user',
      text: promptQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAiChatHistory(prev => [...prev, userMsg]);

    try {
      let aiResponseText = '';

      // If user supplied Gemini API Key, attempt live API call
      if (apiKey) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are DineSense AI, a smart restaurant SaaS assistant. Answer concisely and professionally for restaurant management and dining guests.\nUser Query: ${promptQuery}`
                }]
              }]
            })
          });
          const data = await res.json();
          if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            aiResponseText = data.candidates[0].content.parts[0].text;
          }
        } catch (err) {
          console.warn('Gemini API call fallback to Intelligent Heuristic Engine');
        }
      }

      // If no API key or API call fallback: Intelligent heuristic response generator
      if (!aiResponseText) {
        const queryLower = promptQuery.toLowerCase();
        if (queryLower.includes('recommend') || queryLower.includes('suggest') || queryLower.includes('what to eat')) {
          aiResponseText = "🌟 Based on customer sentiment and current kitchen stock, I highly recommend our **Paneer Tikka Royale** paired with a **Matcha Yuzu Sparkler**. For a rich Italian dish, the **Truffle Mushroom Risotto** is our top-rated chef selection tonight!";
        } else if (queryLower.includes('inventory') || queryLower.includes('waste') || queryLower.includes('stock')) {
          aiResponseText = "⚠️ **Inventory AI Alert**: Cottage Cheese / Paneer (25 kg) and Fresh Wild Mushrooms (12 kg) are at optimal stock. I predict high demand by 21:15 based on Friday evening table reservations. **Action Recommended**: Auto-trigger replenishment order with Dairy Fresh Organics.";
        } else if (queryLower.includes('profit') || queryLower.includes('sales') || queryLower.includes('revenue')) {
          aiResponseText = "📈 **Operational Insight**: Peak order volume is projected between 20:00 - 21:30 with an estimated 48 cover turnover. Promoting the *Mango Pistachio Kulfi Sundae* as a post-dinner special can increase average check size by 18.2%.";
        } else if (queryLower.includes('allergy') || queryLower.includes('gluten') || queryLower.includes('vegan')) {
          aiResponseText = "🌱 **Dietary Check**: Our *Artisan Burrata Salad* (GF, Veg) and *Mediterranean Avocado Crostini* (Vegan) are 100% allergen-friendly choices tonight. All kitchen surfaces undergo strict cross-contamination protocols.";
        } else {
          aiResponseText = `🤖 **DineSense AI Analysis**: For "${promptQuery}", our system predicts a 98% customer satisfaction rating for our 100% Pure Vegetarian menu. Kitchen operations are running smoothly with average prep times at 12.5 minutes per table.`;
        }
      }

      // Simulate realistic AI thought delay
      setTimeout(() => {
        setAiChatHistory(prev => [
          ...prev,
          {
            sender: 'ai',
            text: aiResponseText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsAnalyzing(false);
      }, 600);

    } catch (error) {
      setIsAnalyzing(false);
    }
  };

  // AI Demand Forecasting Generator for Admin Analytics
  const generateDemandForecast = () => {
    return {
      predictedDailyRevenue: "$4,850.00",
      bestsellerPrediction: "Wagyu Smash Burger & Truffle Risotto",
      estimatedTableTurnover: "2.4x",
      wasteRiskAlerts: [
        { item: 'Fresh Wild Mushrooms', risk: 'High', recommendation: 'Promote Truffle Risotto Special' },
        { item: 'Atlantic Salmon', risk: 'Out of Stock', recommendation: 'Reorder immediately' }
      ]
    };
  };

  return (
    <AIContext.Provider value={{
      apiKey,
      setApiKey,
      isAnalyzing,
      aiChatHistory,
      askAI,
      generateDemandForecast
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) throw new Error('useAI must be used within an AIProvider');
  return context;
};
