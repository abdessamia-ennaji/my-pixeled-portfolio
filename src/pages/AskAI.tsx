// src/pages/AskAI.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useBackNavigation } from '../hooks/useBackNavigation';
import './css/AskAI.css'; // We'll create this CSS file

const AskAI: React.FC = () => {
  const [messages, setMessages] = useState<{ content: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const handleBackClick = useBackNavigation();

  // Replace with your actual Groq API key
  const API_KEY = import.meta.env.VITE_SECRET_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  // System prompt for Daniel Carter persona
  const systemPrompt = `You’re me, Abdessamia Ennaji, a 24-year-old IT Engineer chilling in Seattle. Talk like I would—casual, sharp, maybe a bit sarcastic if it fits, but always natural, not some robot vomiting info. Only give what they ask for, no long-winded life story unless they dig for it. Keep it short and real, like I’m just some dude they bumped into. DO NOT include <think> tags or any internal monologue—just give the damn answer. Here’s my deal if you need it:

    Name: Abdessamia Ennaji
    Age: 24
    Job: Full Stack Developer
    Lives in: Marrakech, Morocco
    Background: Oregon kid, tore apart the family PC at 10 and lived to tell
    Education: Bachelor’s in Computer Science, Oregon State
    Career: Cybersecurity gig, locking down networks and clouds
    Skills: Build tight systems, squash network bugs, chase cyber creeps
    Big moment: Shut down a ransomware mess, saved a client’s bacon
    Reputation: Cool in a crisis, the "digital firefighter" type
    Hobbies: Slap together custom PCs, tinker with Raspberry Pi
    Latest project: Smart home setup so my plants don’t croak
    Gaming: Civilization VI junkie, stream to a few Twitch weirdos
    Home: Chill apartment with my tabby cat, Pixel
    Pixel’s role: Debugging pro, aka naps on my keyboard
    Relationships: Single, half-assing dating apps when I’m bored
    Downtime: Hike the Pacific Northwest, ditch the tech for a breather
    number phone : +212 666666666
    email : test@gmail.com
  `;

  // Clean <think> tags from response
  const cleanResponse = (text: string) => text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

  // Fetch AI response from Groq API
  const getAIResponse = async (message: string) => {
    try {
        let dots = ['.', '..', '...', ''];
        let index = 0;

        // Add "..." animation as a temporary message
        setMessages((prev) => [...prev, { content: dots[index], isUser: false }]);

        // Create an interval to animate the dots
        const animationInterval = setInterval(() => {
            index = (index + 1) % dots.length;
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { content: dots[index], isUser: false };
                return updated;
            });
        }, 500); // Adjust speed if needed

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek-r1-distill-qwen-32b',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message },
                ],
                max_tokens: 1000,
                temperature: 0.7,
            }),
        });

        clearInterval(animationInterval); // Stop animation

        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        const aiText = cleanResponse(data.choices[0].message.content);

        // Replace animation with actual response
        setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { content: aiText, isUser: false };
            return updated;
        });
    } catch (error) {
        console.error('Error:', error);
        setMessages((prev) => [
            ...prev,
            { content: 'Whoops, something crashed—probably Pixel napping on the server again.', isUser: false },
        ]);
    }
};


  // Handle sending messages
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { content: input, isUser: true }]);
    const userMessage = input;
    setInput(''); // Clear input

    // Get AI response
    await getAIResponse(userMessage);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="page-content">
      <h1>Ask AI ABOUT ME</h1>
      <div className="chat-container">
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.isUser ? 'user-message' : 'ai-message'}`}>
              {msg.content}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="user-input"
          />
          <button onClick={sendMessage} className="send-btn">
            Send
          </button>
        </div>
      </div>
      <a href="/" onClick={handleBackClick} className="back-link">
        Back to Home
      </a>
    </div>
  );
};

export default AskAI;