'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  Trash2, 
  RefreshCw, 
  Compass, 
  Bot, 
  User, 
  CloudSun,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { LocationInfo, StructuredAIResponse, MapAction } from '@/types/weather';
import { SupportedLanguage, TRANSLATIONS } from '@/lib/ai/multilingual';
import { GroundedResponseCard } from './GroundedResponseCard';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text?: string;
  response?: StructuredAIResponse;
  timestamp: string;
}

interface ChatContainerProps {
  currentLocation: LocationInfo;
  language: SupportedLanguage;
  onTriggerMapAction: (action: MapAction) => void;
  initialPrompt?: string;
  onConsumeInitialPrompt?: () => void;
}

export function ChatContainer({
  currentLocation,
  language,
  onTriggerMapAction,
  initialPrompt,
  onConsumeInitialPrompt
}: ChatContainerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [loadingStep, setLoadingStep] = useState('Understanding Query...');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle external or flagship prompt triggers
  useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt);
      if (onConsumeInitialPrompt) onConsumeInitialPrompt();
    }
  }, [initialPrompt]);

  // Web Speech API initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        const langMap: Record<string, string> = {
          en: 'en-IN',
          hi: 'hi-IN',
          kn: 'kn-IN',
          ta: 'ta-IN',
          te: 'te-IN',
          ml: 'ml-IN',
          bn: 'bn-IN',
          mr: 'mr-IN',
        };
        recognition.lang = langMap[language] || 'en-IN';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputQuery(transcript);
          setIsListening(false);
          handleSend(transcript);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
      }
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome/Edge or type your question.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSend = async (queryText?: string) => {
    const query = (queryText || inputQuery).trim();
    if (!query || isLoading) return;

    setInputQuery('');

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Simulated progress steps for perception
    setLoadingStep('AI Query Understanding & Entity Extraction...');
    setTimeout(() => setLoadingStep('Orchestrating Live NWP Telemetry & Radar Data...'), 300);
    setTimeout(() => setLoadingStep('Evaluating Meteorological Decision Support...'), 600);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          currentLocation,
          language
        })
      });

      if (!res.ok) {
        throw new Error(`API failed: ${res.status}`);
      }

      const json = await res.json();
      if (!json.success || !json.data) {
        throw new Error(json.error || 'Failed to generate weather intelligence response.');
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        response: json.data,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Error connecting to meteorological reasoning engine: ${err.message}. Please retry or pick one of the flagship demo prompts below.`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const samplePrompts = [
    { title: '🌧️ Tomorrow Rain & Travel', query: 'Will it rain tomorrow in Bengaluru, and is it safe to travel?' },
    { title: '🌾 Farmer Pesticide Advisory', query: 'Should I spray pesticides tomorrow in Mysuru?' },
    { title: '🌀 Cyclone Threat Level', query: 'What is the cyclone alert status in Chennai?' },
    { title: '🗺️ Flood Risk GIS Workspace', query: 'Show me flood risk around Bengaluru tomorrow.' },
    { title: '📈 Climate Anomaly 2019 vs 2025', query: 'Compare today\'s weather with 2019 in Bengaluru.' },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] md:h-screen overflow-hidden bg-slate-950/40">
      {/* Header Bar */}
      <div className="h-14 px-4 md:px-6 border-b border-slate-800/80 flex items-center justify-between glass-panel shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Conversational Intelligence
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            Grounding Active
          </span>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors px-2 py-1 rounded-lg hover:bg-slate-800"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Context</span>
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 0 ? (
          /* Empty / Landing Hero State */
          <div className="max-w-2xl mx-auto my-auto pt-6 pb-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-500 via-sky-600 to-indigo-600 mx-auto flex items-center justify-center shadow-xl shadow-cyan-500/20 text-white">
              <CloudSun className="w-8 h-8 animate-pulse-subtle" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Weather<span className="text-cyan-400">GPT</span>
              </h1>
              <p className="text-xs md:text-sm text-slate-400 max-w-lg mx-auto">
                {t.subtitle}
              </p>
            </div>

            {/* Flagship Demonstration Box */}
            <div className="p-4 rounded-2xl glass-card border border-cyan-500/30 text-left space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>SIH2026 Recommended Queries</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p.query)}
                    className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group flex flex-col justify-between"
                  >
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                      {p.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-1 flex items-center justify-between">
                      <span>{p.query}</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Conversation Thread */
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`${msg.sender === 'user' ? 'max-w-[85%]' : 'w-full'}`}>
                  {msg.sender === 'user' ? (
                    <div className="rounded-2xl rounded-tr-sm bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-3.5 text-sm shadow-md">
                      {msg.text}
                    </div>
                  ) : msg.response ? (
                    <GroundedResponseCard
                      response={msg.response}
                      onTriggerMapAction={onTriggerMapAction}
                      onFollowUpClick={(p) => handleSend(p)}
                      language={language}
                    />
                  ) : (
                    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 text-sm text-slate-200">
                      {msg.text}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 items-start max-w-3xl">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl glass-card border border-slate-800 flex items-center gap-3 text-xs text-cyan-300">
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>{loadingStep}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Workspace */}
      <div className="p-3 md:p-4 border-t border-slate-800/80 glass-panel shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="max-w-3xl mx-auto flex items-center gap-2"
        >
          {/* Voice Microphone Trigger */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-3 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse shadow-lg shadow-rose-500/30'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700/80'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Ask using Voice'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={isListening ? 'Listening to speech...' : t.searchPlaceholder}
              className="w-full pl-4 pr-10 py-3 rounded-xl glass-input text-xs md:text-sm"
              disabled={isLoading}
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium disabled:opacity-40 transition-all shadow-md shadow-cyan-500/10 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          WeatherGPT synthesizes NWP model data and official warnings into actionable decisions.
        </p>
      </div>
    </div>
  );
}
