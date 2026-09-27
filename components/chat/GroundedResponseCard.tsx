'use client';

import React, { useState } from 'react';
import { 
  CloudRain, 
  Wind, 
  Droplets, 
  Eye, 
  Sun, 
  Map as MapIcon, 
  ShieldCheck, 
  Clock, 
  Database, 
  Volume2, 
  VolumeX, 
  Car, 
  Wheat, 
  ShieldAlert, 
  School, 
  Anchor, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { StructuredAIResponse, DecisionSupportItem, MapAction } from '@/types/weather';
import { RiskBadge } from '../ui/Badge';
import { SupportedLanguage } from '@/lib/ai/multilingual';

interface GroundedResponseCardProps {
  response: StructuredAIResponse;
  onTriggerMapAction: (action: MapAction) => void;
  onFollowUpClick: (prompt: string) => void;
  language: SupportedLanguage;
}

export function GroundedResponseCard({
  response,
  onTriggerMapAction,
  onFollowUpClick,
  language
}: GroundedResponseCardProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showSourcesDetail, setShowSourcesDetail] = useState(false);
  const [showConfidenceDetail, setShowConfidenceDetail] = useState(false);

  const obs = response.observation;
  const decision = response.decisionSupport[0]; // primary decision support

  // Speech Synthesis
  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(response.forecastSummary);
    
    // Choose appropriate voice/locale
    const localeMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      kn: 'kn-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      ml: 'ml-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
    };
    utterance.lang = localeMap[language] || 'en-IN';
    utterance.rate = 1.0;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'TRAVEL': return Car;
      case 'AGRICULTURE': return Wheat;
      case 'DISASTER': return ShieldAlert;
      case 'SCHOOLS': return School;
      case 'MARINE': return Anchor;
      default: return ShieldCheck;
    }
  };

  return (
    <div className="w-full rounded-2xl glass-card border border-slate-700/80 p-4 md:p-6 space-y-5 text-slate-100 shadow-xl transition-all">
      {/* 1. Header & Audio Playback */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <CloudRain className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-100">{obs.location.name}</span>
              <span className="text-xs text-slate-400">({response.parsedIntent.timeRange})</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Lead horizon: 24h • Assimilated at {new Date(response.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <button
          onClick={handleSpeak}
          className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
            isPlayingAudio
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse'
              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
          }`}
          title={isPlayingAudio ? 'Stop Speech' : 'Listen Aloud'}
        >
          {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline text-[11px]">{isPlayingAudio ? 'Stop' : 'Listen'}</span>
        </button>
      </div>

      {/* 2. Forecast Summary (Natural Language) */}
      <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 leading-relaxed text-sm text-slate-200">
        <p className="whitespace-pre-line">{response.forecastSummary}</p>
      </div>

      {/* 3. Meteorological Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
            <Sun className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Temperature</div>
            <div className="text-xs font-semibold text-slate-100">{obs.temperature}°C <span className="text-[10px] font-normal text-slate-400">(feels {obs.feelsLike}°C)</span></div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
            <CloudRain className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Precipitation</div>
            <div className="text-xs font-semibold text-slate-100">{obs.precipitationProbability}% <span className="text-[10px] font-normal text-slate-400">({obs.precipitation} mm)</span></div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
            <Wind className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Surface Wind</div>
            <div className="text-xs font-semibold text-slate-100">{obs.windSpeed} km/h <span className="text-[10px] font-normal text-slate-400">({obs.windDirection}°)</span></div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
            <Eye className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Visibility</div>
            <div className="text-xs font-semibold text-slate-100">{obs.visibility} km <span className="text-[10px] font-normal text-slate-400">({obs.humidity}% RH)</span></div>
          </div>
        </div>
      </div>

      {/* 4. AI DECISION SUPPORT CARD (The central differentiator) */}
      {decision && (
        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-slate-900/80 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {React.createElement(getDomainIcon(decision.domain), { className: 'w-4 h-4 text-cyan-400' })}
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                AI Decision Support — {decision.domainName}
              </span>
            </div>
            <RiskBadge level={decision.riskLevel} size="sm" />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-100">{decision.headline}</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{decision.actionableRecommendation}</p>
          </div>

          {/* Safe & Caution Windows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
            {decision.safeWindows && decision.safeWindows.length > 0 && (
              <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                <span className="font-semibold block text-[11px]">🟢 Recommended Window:</span>
                {decision.safeWindows.join(', ')}
              </div>
            )}
            {decision.cautionWindows && decision.cautionWindows.length > 0 && (
              <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300">
                <span className="font-semibold block text-[11px]">⚠️ Elevated Risk Window:</span>
                {decision.cautionWindows.join(', ')}
              </div>
            )}
          </div>

          {/* Evidence List */}
          <div className="pt-2 border-t border-slate-800">
            <p className="text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
              <Info className="w-3 h-3 text-cyan-400" />
              Meteorological Evidence:
            </p>
            <ul className="space-y-1">
              {decision.evidence.map((ev, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 5. Hourly Rain Timeline Preview */}
      {response.hourlyHighlights.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium">Precipitation Timeline (Next 12h)</span>
            <span className="text-[11px] font-mono">Intensity & Probability</span>
          </div>

          <div className="flex items-end gap-1.5 overflow-x-auto pb-2 pt-4">
            {response.hourlyHighlights.map((hour, idx) => {
              const heightPct = Math.min(Math.max((hour.precipitationProbability || 5), 10), 100);
              const isPeak = hour.riskLevel === 'HIGH' || hour.riskLevel === 'CRITICAL';
              return (
                <div key={idx} className="flex-1 min-w-[42px] flex flex-col items-center gap-1.5">
                  <div className="text-[10px] font-mono text-slate-400">{hour.precipitationAmount > 0 ? `${hour.precipitationAmount}mm` : '0'}</div>
                  <div className="w-full bg-slate-800/80 rounded-t h-16 flex items-end p-0.5">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t transition-all ${
                        isPeak 
                          ? 'bg-rose-500 shadow-sm shadow-rose-500/50' 
                          : hour.precipitationProbability > 40 
                            ? 'bg-cyan-500' 
                            : 'bg-sky-700/60'
                      }`}
                    />
                  </div>
                  <span className={`text-[10px] font-medium ${isPeak ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                    {hour.displayTime}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. GIS Map Action Button (if query warrants map) */}
      {response.mapAction && (
        <button
          onClick={() => onTriggerMapAction(response.mapAction!)}
          className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md group"
        >
          <MapIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span>Launch GIS Weather Map: {response.mapAction.targetLayers.join(' + ').toUpperCase()}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}

      {/* 7. Confidence & Provenance Collapsible Strip */}
      <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        {/* Confidence */}
        <div className="relative">
          <button
            onClick={() => setShowConfidenceDetail(!showConfidenceDetail)}
            className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Confidence: <strong className="text-cyan-300 font-mono">{response.confidence.score}%</strong></span>
          </button>

          {showConfidenceDetail && (
            <div className="absolute left-0 bottom-7 w-72 rounded-xl p-3 glass-panel border border-slate-700 shadow-2xl z-30 space-y-2">
              <div className="font-semibold text-slate-200 text-xs">{response.confidence.label}</div>
              <div className="space-y-1.5">
                {response.confidence.factors.map((f, i) => (
                  <div key={i} className="text-[11px]">
                    <div className="flex justify-between text-slate-300">
                      <span>{f.name}</span>
                      <span className="font-mono text-cyan-300">{f.score}%</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{f.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sources & Provenance */}
        <div className="relative">
          <button
            onClick={() => setShowSourcesDetail(!showSourcesDetail)}
            className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span>Source: <strong className="text-slate-300">{response.provenance.model.split('/')[0]}</strong></span>
          </button>

          {showSourcesDetail && (
            <div className="absolute right-0 bottom-7 w-80 rounded-xl p-3 glass-panel border border-slate-700 shadow-2xl z-30 space-y-2">
              <div className="font-semibold text-slate-200 text-xs">Data Provenance & Lineage</div>
              <div className="space-y-1 text-[11px] text-slate-300">
                <div><strong>Provider:</strong> {response.provenance.providerName}</div>
                <div><strong>Model:</strong> {response.provenance.model}</div>
                <div><strong>Issue Time:</strong> {response.provenance.forecastIssueTime}</div>
                <div><strong>Mode:</strong> {response.provenance.isSimulated ? 'Simulated Adapter' : 'Live NWP Stream'}</div>
                {response.provenance.notes && (
                  <div className="text-[10px] text-slate-400 pt-1 italic">{response.provenance.notes}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 8. Follow-up Suggestion Chips */}
      {response.followUpSuggestions.length > 0 && (
        <div className="pt-2 border-t border-slate-800/60">
          <p className="text-[11px] font-medium text-slate-400 mb-2">Suggested Inquiries:</p>
          <div className="flex flex-wrap gap-1.5">
            {response.followUpSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onFollowUpClick(prompt)}
                className="px-2.5 py-1 rounded-full text-xs bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-200 transition-all flex items-center gap-1"
              >
                <span>{prompt}</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
