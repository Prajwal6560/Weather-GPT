'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Bell, 
  Search, 
  ShieldAlert, 
  Menu, 
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { LocationInfo, WeatherAlert } from '@/types/weather';
import { POPULAR_INDIAN_LOCATIONS } from '@/lib/weather/locations';
import { RiskBadge } from '../ui/Badge';
import { ActiveTab } from './Sidebar';

interface TopBarProps {
  currentLocation: LocationInfo;
  onSelectLocation: (loc: LocationInfo) => void;
  alerts: WeatherAlert[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onViewAlertOnMap?: (alert: WeatherAlert) => void;
}

export function TopBar({
  currentLocation,
  onSelectLocation,
  alerts,
  activeTab,
  setActiveTab,
  onViewAlertOnMap
}: TopBarProps) {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredLocations = POPULAR_INDIAN_LOCATIONS.filter(l => 
    l.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    (l.state && l.state.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const severeAlertCount = alerts.filter(a => a.severity === 'RED' || a.severity === 'ORANGE').length;

  return (
    <header className="h-16 border-b border-slate-800/80 glass-panel px-4 md:px-6 flex items-center justify-between z-20 shrink-0">
      {/* Mobile Title & Menu */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <span className="font-bold text-base text-white">Weather<span className="text-cyan-400">GPT</span></span>
        </div>

        {/* Current Location Pill */}
        <div className="relative">
          <button
            onClick={() => setShowLocationModal(!showLocationModal)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs md:text-sm font-medium text-slate-200 transition-all shadow-sm group"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400 group-hover:animate-bounce" />
            <span className="font-semibold">{currentLocation.name}</span>
            {currentLocation.state && (
              <span className="text-slate-400 text-xs hidden sm:inline">, {currentLocation.state}</span>
            )}
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Location Selector Dropdown */}
          {showLocationModal && (
            <div className="absolute left-0 mt-2 w-72 rounded-2xl p-3 glass-panel z-50 border border-slate-700 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search city in India..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl glass-input text-xs"
                  autoFocus
                />
              </div>
              <div className="max-h-56 overflow-y-auto space-y-1">
                {filteredLocations.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => {
                      onSelectLocation(loc);
                      setShowLocationModal(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      loc.name === currentLocation.name
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-slate-100">{loc.name}</div>
                      <div className="text-[10px] text-slate-400">{loc.state}</div>
                    </div>
                    {loc.elevation && (
                      <span className="text-[10px] font-mono text-slate-400">{loc.elevation}m</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Surface Indicator & Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Telemetry pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Assimilation: GFS / ECMWF / IMD</span>
        </div>

        {/* Notifications & Warnings Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white relative transition-colors"
            title="Weather Alerts & Notifications"
          >
            <Bell className="w-4 h-4" />
            {severeAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {severeAlertCount}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 rounded-2xl p-4 glass-panel z-50 border border-slate-700 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-sm text-slate-100">Active Warning Center</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">{alerts.length} Active</span>
              </div>

              <div className="mt-3 max-h-72 overflow-y-auto space-y-2.5">
                {alerts.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">No active severe weather warnings.</p>
                ) : (
                  alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-slate-100">{alert.title}</h4>
                        <RiskBadge level={alert.severity} size="sm" />
                      </div>
                      <p className="text-[11px] text-slate-300 line-clamp-2">{alert.description}</p>
                      <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                        <span>{alert.source}</span>
                        {onViewAlertOnMap && (
                          <button
                            onClick={() => {
                              onViewAlertOnMap(alert);
                              setShowNotifications(false);
                            }}
                            className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                          >
                            <span>Map</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-3 mt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setActiveTab('alerts');
                    setShowNotifications(false);
                  }}
                  className="w-full py-1.5 rounded-lg text-xs font-medium text-cyan-400 hover:bg-cyan-500/10 text-center transition-colors"
                >
                  View Full Early Warning Center →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
