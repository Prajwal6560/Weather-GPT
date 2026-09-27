'use client';

import React from 'react';
import { 
  MessageSquare, 
  LayoutDashboard, 
  Map as MapIcon, 
  LineChart, 
  ShieldAlert, 
  Settings, 
  CloudSun, 
  Sparkles,
  Layers,
  ChevronRight,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/lib/ai/multilingual';

export type ActiveTab = 'chat' | 'dashboard' | 'map' | 'insights' | 'alerts' | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  onSelectFlagshipScenario: (scenario: string, prompt: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onSelectFlagshipScenario,
  isDark,
  setIsDark
}: SidebarProps) {
  const navItems: NavItem[] = [
    { id: 'chat', label: 'Chat', icon: MessageSquare, badge: 'AI' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Weather Map', icon: MapIcon, badge: 'GIS' },
    { id: 'insights', label: 'Insights', icon: LineChart },
    { id: 'alerts', label: 'Alerts', icon: ShieldAlert, badgeColor: 'bg-rose-500' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 glass-panel flex flex-col justify-between h-screen shrink-0 hidden md:flex">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white">
            <CloudSun className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">Weather<span className="text-cyan-400">GPT</span></span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">SIH 2026</span>
            </div>
            <p className="text-xs text-slate-400">Meteorological Intelligence</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2">
            Surfaces
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Flagship Demo Scenarios for SIH Judges */}
        <div className="pt-2 border-t border-slate-800/50">
          <div className="flex items-center gap-1.5 px-3 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Flagship Scenarios
            </p>
          </div>
          <div className="space-y-1.5">
            <button
              onClick={() => onSelectFlagshipScenario('BENGALURU_RAIN', 'Will it rain tomorrow in Bengaluru, and is it safe to travel?')}
              className="w-full text-left px-3 py-2 rounded-lg text-xs bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 transition-all group"
            >
              <div className="font-medium text-slate-200 group-hover:text-cyan-300 flex items-center justify-between">
                <span>🌧️ Bengaluru Rain & Travel</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">Tomorrow rain & safest window</p>
            </button>

            <button
              onClick={() => onSelectFlagshipScenario('MYSURU_FARMER', 'Should I spray pesticides tomorrow in Mysuru?')}
              className="w-full text-left px-3 py-2 rounded-lg text-xs bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 text-slate-300 transition-all group"
            >
              <div className="font-medium text-slate-200 group-hover:text-amber-300 flex items-center justify-between">
                <span>🌾 Mysuru Agri Spraying</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">Wash-off risk & dry window</p>
            </button>

            <button
              onClick={() => onSelectFlagshipScenario('CHENNAI_CYCLONE', 'What is the cyclone alert status in Chennai?')}
              className="w-full text-left px-3 py-2 rounded-lg text-xs bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/40 text-slate-300 transition-all group"
            >
              <div className="font-medium text-slate-200 group-hover:text-rose-300 flex items-center justify-between">
                <span>🌀 Chennai Cyclone Alert</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">Bay of Bengal red warning</p>
            </button>

            <button
              onClick={() => onSelectFlagshipScenario('BENGALURU_FLOOD', 'Show me flood risk around Bengaluru tomorrow.')}
              className="w-full text-left px-3 py-2 rounded-lg text-xs bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/40 text-slate-300 transition-all group"
            >
              <div className="font-medium text-slate-200 group-hover:text-blue-300 flex items-center justify-between">
                <span>🗺️ Bengaluru Flood GIS</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">Auto-triggers GIS layers</p>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Controls: Language & Theme */}
      <div className="p-4 border-t border-slate-800/60 space-y-3">
        {/* Language selector */}
        <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 rounded-lg p-2 border border-slate-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Language</span>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
            className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer font-medium"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-200">
                {lang.nativeName}
              </option>
            ))}
          </select>
        </div>

        {/* Theme & Status */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] text-emerald-400 font-mono">LIVE GFS 0.25°</span>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
