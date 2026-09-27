'use client';

import React from 'react';
import { 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Compass, 
  Gauge, 
  ShieldAlert, 
  Sparkles, 
  ChevronRight, 
  Map as MapIcon,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { WeatherObservation, HourlyForecast, DailyForecast, WeatherAlert, LocationInfo } from '@/types/weather';
import { RiskBadge } from '../ui/Badge';
import { ActiveTab } from '../navigation/Sidebar';

interface DashboardViewProps {
  currentLocation: LocationInfo;
  observation: WeatherObservation;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts: WeatherAlert[];
  setActiveTab: (tab: ActiveTab) => void;
  onAskChat: (prompt: string) => void;
}

export function DashboardView({
  currentLocation,
  observation,
  hourly,
  daily,
  alerts,
  setActiveTab,
  onAskChat
}: DashboardViewProps) {
  const activeSevereAlert = alerts.find(a => a.severity === 'RED' || a.severity === 'ORANGE');

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* 1. Severe Alerts Banner (if any) */}
      {activeSevereAlert && (
        <div className="rounded-2xl p-4 bg-rose-950/40 border border-rose-500/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-rose-950/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-rose-200">{activeSevereAlert.title}</span>
                <RiskBadge level={activeSevereAlert.severity} size="sm" />
              </div>
              <p className="text-xs text-rose-300/90 mt-0.5">{activeSevereAlert.description}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('alerts')}
            className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 transition-colors whitespace-nowrap"
          >
            Review Precautions
          </button>
        </div>
      )}

      {/* 2. Top Row: Current Weather Hero + AI Daily Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Weather Card */}
        <div className="lg:col-span-2 rounded-3xl p-6 md:p-8 glass-panel border border-slate-700/80 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{currentLocation.name}</h2>
              <p className="text-xs md:text-sm text-slate-400">{currentLocation.state || 'India'}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
                {observation.temperature}°<span className="text-xl text-slate-400">C</span>
              </div>
              <p className="text-xs text-slate-400">Feels like {observation.feelsLike}°C</p>
            </div>
          </div>

          <div className="my-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
              <CloudRain className="w-3.5 h-3.5" />
              <span>{observation.weatherDescription}</span>
            </div>
          </div>

          {/* Meteorological Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
            <div>
              <span className="text-[11px] text-slate-400 block">Humidity</span>
              <span className="text-sm font-semibold text-slate-200">{observation.humidity}%</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Wind Velocity</span>
              <span className="text-sm font-semibold text-slate-200">{observation.windSpeed} km/h</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Barometer</span>
              <span className="text-sm font-semibold text-slate-200">{observation.pressure} hPa</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Air Quality</span>
              <span className="text-sm font-semibold text-emerald-400">{observation.aqiStatus || 'Good'}</span>
            </div>
          </div>
        </div>

        {/* AI Meteorological Decision Assistant Widget */}
        <div className="rounded-3xl p-6 glass-panel border border-cyan-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Meteorological Insight</span>
            </div>
            <h3 className="text-base font-semibold text-slate-100">
              Commuter & Field Briefing
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Convective cloud development anticipated tomorrow afternoon. Arterial road corridors around {currentLocation.name} face elevated congestion risk due to slick surfaces.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Recommended Action:</span>
              <span className="text-emerald-400 font-medium">Safe Window</span>
            </div>
            <p className="text-slate-200 font-medium text-xs">
              Complete intra-city transit before 2:00 PM for optimal road safety.
            </p>
          </div>

          <button
            onClick={() => onAskChat(`Will it rain tomorrow in ${currentLocation.name}, and is it safe to travel?`)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <span>Ask WeatherGPT for Full Analysis</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. 24-Hour Hourly Timeline Strip */}
      <div className="rounded-3xl p-6 glass-panel border border-slate-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100">24-Hour Precipitation & Temperature Timeline</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Resolution: 1 Hour</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-2">
          {hourly.slice(0, 18).map((hour, idx) => {
            const hasRain = hour.precipitationProbability > 40;
            return (
              <div
                key={idx}
                className={`flex-1 min-w-[70px] p-3 rounded-2xl border text-center transition-all ${
                  hasRain 
                    ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-200' 
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                }`}
              >
                <div className="text-[11px] font-mono text-slate-400 mb-1">{hour.displayTime}</div>
                <div className="text-sm font-bold text-slate-100 my-1">{hour.temperature}°</div>
                <div className="flex items-center justify-center gap-1 text-[11px] font-medium text-cyan-400">
                  <CloudRain className="w-3 h-3" />
                  <span>{hour.precipitationProbability}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Row: 7-Day Forecast + GIS Map Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Forecast */}
        <div className="lg:col-span-2 rounded-3xl p-6 glass-panel border border-slate-700/80 space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-100">7-Day Meteorological Outlook</h3>
          </div>

          <div className="space-y-2">
            {daily.map((day, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800/80 flex items-center justify-between text-xs transition-colors"
              >
                <div className="w-24 font-medium text-slate-200">{day.dayOfWeek}</div>
                
                <div className="flex items-center gap-2 text-slate-300 w-36">
                  <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="truncate">{day.weatherDescription}</span>
                </div>

                <div className="flex items-center gap-1.5 text-cyan-400 font-mono w-16">
                  <span>{day.precipitationProbability}%</span>
                </div>

                <div className="flex items-center gap-3 font-mono text-right">
                  <span className="text-slate-400 text-[11px] flex items-center">
                    <ArrowDown className="w-2.5 h-2.5 mr-0.5 text-blue-400" />
                    {day.tempMin}°
                  </span>
                  <span className="text-slate-100 font-bold flex items-center">
                    <ArrowUp className="w-2.5 h-2.5 mr-0.5 text-amber-400" />
                    {day.tempMax}°
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GIS Map Snapshot Preview */}
        <div className="rounded-3xl p-6 glass-panel border border-slate-700/80 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-slate-100 font-semibold text-sm mb-1">
              <MapIcon className="w-4 h-4 text-cyan-400" />
              <span>GIS Weather Workspace</span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive high-resolution radar sweeps, precipitation contours, and urban flood risk zones.
            </p>
          </div>

          {/* Interactive Visual Map Card */}
          <div 
            onClick={() => setActiveTab('map')}
            className="w-full h-36 rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 border border-slate-700 relative overflow-hidden cursor-pointer group flex items-center justify-center"
          >
            {/* Radar sweep effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity">
              <div className="w-28 h-28 rounded-full border border-cyan-500/40 animate-ping" />
              <div className="w-16 h-16 rounded-full border border-cyan-400/60" />
            </div>
            
            <div className="z-10 text-center space-y-1">
              <span className="px-3 py-1 rounded-full bg-slate-900/90 text-cyan-300 text-xs font-semibold border border-cyan-500/40 shadow-lg">
                Launch Full GIS Map 🛰️
              </span>
              <p className="text-[10px] text-slate-400">Layers: Precipitation, Flood & Cyclone</p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('map')}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Open Advanced GIS Workspace</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
