'use client';

import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  MapPin, 
  Bell, 
  Globe, 
  Sliders, 
  ShieldCheck, 
  Database,
  Moon,
  Sun,
  Mic,
  Check
} from 'lucide-react';
import { LocationInfo } from '@/types/weather';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/lib/ai/multilingual';
import { POPULAR_INDIAN_LOCATIONS } from '@/lib/weather/locations';

interface SettingsPanelProps {
  currentLocation: LocationInfo;
  onSelectLocation: (loc: LocationInfo) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export function SettingsPanel({
  currentLocation,
  onSelectLocation,
  language,
  setLanguage,
  isDark,
  setIsDark
}: SettingsPanelProps) {
  const [userName, setUserName] = useState('Prajwal (SIH Innovator)');
  const [userRole, setUserRole] = useState('Disaster Management Authority');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [speedUnit, setSpeedUnit] = useState<'kmh' | 'mph'>('kmh');
  
  const [notifications, setNotifications] = useState({
    severeAlerts: true,
    cycloneTrack: true,
    urbanFloodWatch: true,
    farmerAgroBulletins: true,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">System Configuration & Preferences</h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Customize localized telemetry, units, notifications, and user persona for WeatherGPT.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Configuration preferences updated successfully.</span>
        </div>
      )}

      {/* 1. User Profile & Persona */}
      <div className="rounded-3xl p-6 glass-panel border border-slate-700/80 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <User className="w-4 h-4 text-cyan-400" />
          <span>User Persona & Contextual Bias</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Display Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Target Persona</label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            >
              <option value="Citizen" className="bg-slate-900">Citizen / Daily Commuter</option>
              <option value="Farmer" className="bg-slate-900">Farmer / Agro-Manager</option>
              <option value="Disaster Management Authority" className="bg-slate-900">Disaster Management Authority (SDRF/NDRF)</option>
              <option value="Researcher" className="bg-slate-900">Climatology Researcher</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Language & Speech Preferences */}
      <div className="rounded-3xl p-6 glass-panel border border-slate-700/80 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>Multilingual & Voice Interaction</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">System Language (8 Supported)</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs font-medium"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code} className="bg-slate-900">
                  {lang.name} — {lang.nativeName} ({lang.speechLocale})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Microphone & Speech Engine</label>
            <div className="px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                <span>Web Speech API Audio Synthesis</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">READY</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Favorite Default Location */}
      <div className="rounded-3xl p-6 glass-panel border border-slate-700/80 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span>Default Operational Location</span>
        </div>

        <div>
          <label className="text-xs text-slate-400 block mb-1">Current Active Station</label>
          <select
            value={currentLocation.name}
            onChange={(e) => {
              const matched = POPULAR_INDIAN_LOCATIONS.find(l => l.name === e.target.value);
              if (matched) onSelectLocation(matched);
            }}
            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
          >
            {POPULAR_INDIAN_LOCATIONS.map(loc => (
              <option key={loc.name} value={loc.name} className="bg-slate-900">
                {loc.name}, {loc.state} ({loc.latitude}°, {loc.longitude}°)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Units & Measurement Scale */}
      <div className="rounded-3xl p-6 glass-panel border border-slate-700/80 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span>Meteorological Measurement Scales</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Temperature Unit</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTempUnit('C')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border ${
                  tempUnit === 'C' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Celsius (°C)
              </button>
              <button
                type="button"
                onClick={() => setTempUnit('F')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border ${
                  tempUnit === 'F' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                Fahrenheit (°F)
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Wind Speed Unit</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSpeedUnit('kmh')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border ${
                  speedUnit === 'kmh' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                km/h
              </button>
              <button
                type="button"
                onClick={() => setSpeedUnit('mph')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border ${
                  speedUnit === 'mph' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                mph
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Theme & Notifications */}
      <div className="rounded-3xl p-6 glass-panel border border-slate-700/80 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Bell className="w-4 h-4 text-cyan-400" />
          <span>Notification & Warning Subscriptions</span>
        </div>

        <div className="space-y-2">
          {Object.entries(notifications).map(([key, val]) => (
            <label key={key} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <span className="text-xs text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <input
                type="checkbox"
                checked={val}
                onChange={() => setNotifications(prev => ({ ...prev, [key]: !val }))}
                className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/10 transition-all"
      >
        Save Changes
      </button>
    </div>
  );
}
