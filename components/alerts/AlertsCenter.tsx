'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  Map as MapIcon,
  BellRing
} from 'lucide-react';
import { WeatherAlert, LocationInfo } from '@/types/weather';
import { RiskBadge } from '../ui/Badge';
import { ActiveTab } from '../navigation/Sidebar';

interface AlertsCenterProps {
  alerts: WeatherAlert[];
  currentLocation: LocationInfo;
  setActiveTab: (tab: ActiveTab) => void;
  onViewAlertOnMap: (alert: WeatherAlert) => void;
}

export function AlertsCenter({
  alerts,
  currentLocation,
  setActiveTab,
  onViewAlertOnMap
}: AlertsCenterProps) {
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'RED' | 'ORANGE' | 'YELLOW'>('ALL');
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(alerts[0]?.id || null);

  const filteredAlerts = filterSeverity === 'ALL'
    ? alerts
    : alerts.filter(a => a.severity === filterSeverity);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Title & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Early Warning & Disaster Civil Defense</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-hazard bulletins assimilated from India Meteorological Department (IMD) and State Disaster Management Authorities.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl glass-panel border border-slate-800">
          {(['ALL', 'RED', 'ORANGE', 'YELLOW'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                filterSeverity === sev
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Official Protocol Advisory Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <BellRing className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-100">National Disaster Management Framework:</strong> Official government meteorological warnings take immediate precedence over routine forecasts. In the event of a Red Alert, civilian movement in designated hazard corridors is strictly discouraged.
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center glass-panel rounded-3xl border border-slate-800 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-semibold text-slate-200">No Active Warnings for Selected Criteria</h3>
            <p className="text-xs text-slate-400">Atmospheric conditions in this jurisdiction remain within safe operational baselines.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isExpanded = expandedAlertId === alert.id;
            return (
              <div
                key={alert.id}
                className="rounded-3xl glass-panel border border-slate-700/80 overflow-hidden transition-all shadow-xl"
              >
                {/* Clickable Header */}
                <div
                  onClick={() => setExpandedAlertId(isExpanded ? null : alert.id)}
                  className="p-5 md:p-6 cursor-pointer hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <RiskBadge level={alert.severity} size="md" />
                      <h3 className="text-base font-bold text-slate-100">{alert.title}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        Valid Until: {new Date(alert.validUntil).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                      <span>•</span>
                      <span>Source: <strong className="text-slate-300">{alert.source}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewAlertOnMap(alert);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <MapIcon className="w-3.5 h-3.5" />
                      <span>GIS Map</span>
                    </button>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-6 md:px-6 md:pb-6 pt-2 border-t border-slate-800/80 space-y-4 text-xs">
                    <div>
                      <h4 className="font-semibold text-slate-300 mb-1">Meteorological Synopsis:</h4>
                      <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        {alert.description}
                      </p>
                    </div>

                    {/* Affected Districts */}
                    <div>
                      <h4 className="font-semibold text-slate-300 mb-2 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        Jurisdictions & Affected Districts:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {alert.affectedDistricts.map((d, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Precautionary Checklist */}
                    <div>
                      <h4 className="font-semibold text-amber-300 mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Civic & Personal Protection Measures:
                      </h4>
                      <ul className="space-y-1.5">
                        {alert.recommendedPrecautions.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Advisory Progression Timeline */}
                    <div className="pt-2 border-t border-slate-800">
                      <h4 className="font-semibold text-slate-400 text-[11px] mb-2 uppercase tracking-wider">
                        Advisory Issuance Timeline
                      </h4>
                      <div className="space-y-2 border-l-2 border-cyan-500/40 ml-2 pl-3">
                        <div className="text-[11px]">
                          <span className="font-mono text-cyan-400 block">Issued at {new Date(alert.issuedAt).toLocaleTimeString()}</span>
                          <span className="text-slate-300 font-medium">Initial Bulletin Published by Regional Center</span>
                        </div>
                        <div className="text-[11px]">
                          <span className="font-mono text-cyan-400 block">Updated +2h</span>
                          <span className="text-slate-300 font-medium">District Collectorates & SDRF Dispatched Telemetry Watch</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
