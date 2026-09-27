'use client';

import React from 'react';
import { MessageSquare, LayoutDashboard, Map as MapIcon, LineChart, ShieldAlert, Settings } from 'lucide-react';
import { ActiveTab } from './Sidebar';

interface MobileNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  alertCount: number;
}

interface MobileTabItem {
  id: ActiveTab;
  label: string;
  icon: any;
  hasBadge?: boolean;
}

export function MobileNav({ activeTab, setActiveTab, alertCount }: MobileNavProps) {
  const tabs: MobileTabItem[] = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'GIS Map', icon: MapIcon },
    { id: 'insights', label: 'Insights', icon: LineChart },
    { id: 'alerts', label: 'Alerts', icon: ShieldAlert, hasBadge: alertCount > 0 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 glass-panel border-t border-slate-800/80 z-40 px-2 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center w-14 py-1 relative transition-colors ${
              isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {tab.hasBadge && (
                <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </div>
            <span className="text-[10px] font-medium mt-1">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
