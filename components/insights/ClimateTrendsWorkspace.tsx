'use client';

import React, { useState } from 'react';
import { 
  LineChart as LineChartIcon, 
  Sparkles, 
  Calendar, 
  ArrowUpRight, 
  TrendingUp, 
  CloudRain, 
  Flame, 
  Droplet,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { LocationInfo } from '@/types/weather';
import { getHistoricalClimateComparison } from '@/lib/weather/providers/simulation';
import { POPULAR_INDIAN_LOCATIONS } from '@/lib/weather/locations';

interface ClimateTrendsWorkspaceProps {
  currentLocation: LocationInfo;
  onSelectLocation: (loc: LocationInfo) => void;
}

export function ClimateTrendsWorkspace({
  currentLocation,
  onSelectLocation
}: ClimateTrendsWorkspaceProps) {
  const [selectedCity, setSelectedCity] = useState(currentLocation.name);
  const climateData = getHistoricalClimateComparison(selectedCity);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const rainfallChartData = months.map((m, i) => ({
    month: m,
    '2019 (Historical)': climateData.monthlyRainfallA[i],
    '2025 (Observed)': climateData.monthlyRainfallB[i],
  }));

  const tempChartData = months.map((m, i) => ({
    month: m,
    '2019 Mean Temp': climateData.monthlyTempA[i],
    '2025 Mean Temp': climateData.monthlyTempB[i],
  }));

  const extremeEventsData = [
    { year: '2019', 'Extreme Heat Days (>36°C)': climateData.extremeHeatDaysA, 'Intense Cloudburst Days (>50mm)': climateData.extremeRainDaysA },
    { year: '2025', 'Extreme Heat Days (>36°C)': climateData.extremeHeatDaysB, 'Intense Cloudburst Days (>50mm)': climateData.extremeRainDaysB },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header & City Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <LineChartIcon className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Climate & Decadal Anomaly Intelligence</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing 30-year climatological baselines and comparative decadal shifts for Indian metropolitan regions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Target Region:</span>
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              const found = POPULAR_INDIAN_LOCATIONS.find(l => l.name === e.target.value);
              if (found) onSelectLocation(found);
            }}
            className="px-3 py-1.5 rounded-xl glass-input text-xs font-semibold text-cyan-300 focus:outline-none"
          >
            {POPULAR_INDIAN_LOCATIONS.map(loc => (
              <option key={loc.name} value={loc.name} className="bg-slate-900 text-slate-200">
                {loc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grounded AI Climate Synthesis Card */}
      <div className="rounded-3xl p-6 glass-panel border border-cyan-500/40 relative overflow-hidden space-y-3">
        <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AI Meteorological Climate Assessment (2019 vs 2025)</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-normal">
          {climateData.aiInterpretation}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Rainfall Shift</span>
            <span className="text-sm font-bold text-cyan-400 font-mono">+{climateData.annualRainfallDeltaPercent}% Anomaly</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Mean Temperature Shift</span>
            <span className="text-sm font-bold text-rose-400 font-mono">+{climateData.meanTempDelta}°C</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Heatwave Days</span>
            <span className="text-sm font-bold text-amber-400 font-mono">{climateData.extremeHeatDaysB} Days (vs {climateData.extremeHeatDaysA})</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Cloudburst Vulnerability</span>
            <span className="text-sm font-bold text-blue-400 font-mono">Elevated (12 Evts)</span>
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Rainfall Comparison */}
        <div className="rounded-3xl p-6 glass-panel border border-slate-700/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-slate-100">Monthly Rainfall Accumulation (mm)</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">2019 vs 2025</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rainfallChartData}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="2019 (Historical)" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.7} />
                <Bar dataKey="2025 (Observed)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature Profile */}
        <div className="rounded-3xl p-6 glass-panel border border-slate-700/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-slate-100">Mean Temperature Curve (°C)</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Seasonal Climatology</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tempChartData}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[15, 35]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="2019 Mean Temp" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="2025 Mean Temp" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
