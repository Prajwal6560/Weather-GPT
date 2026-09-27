'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar, ActiveTab } from '@/components/navigation/Sidebar';
import { TopBar } from '@/components/navigation/TopBar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { WeatherMapWorkspace } from '@/components/map/WeatherMapWorkspace';
import { ClimateTrendsWorkspace } from '@/components/insights/ClimateTrendsWorkspace';
import { AlertsCenter } from '@/components/alerts/AlertsCenter';
import { SettingsPanel } from '@/components/settings/SettingsPanel';

import { LocationInfo, WeatherObservation, HourlyForecast, DailyForecast, WeatherAlert, MapAction } from '@/types/weather';
import { POPULAR_INDIAN_LOCATIONS } from '@/lib/weather/locations';
import { SupportedLanguage } from '@/lib/ai/multilingual';
import { getBengaluruRainScenario } from '@/lib/weather/providers/simulation';

export default function WeatherGPTApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [currentLocation, setCurrentLocation] = useState<LocationInfo>(POPULAR_INDIAN_LOCATIONS[0]);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isDark, setIsDark] = useState(true);

  // Initial Scenario Mock data
  const defaultScenario = getBengaluruRainScenario();
  const [observation, setObservation] = useState<WeatherObservation>(defaultScenario.observation);
  const [hourly, setHourly] = useState<HourlyForecast[]>(defaultScenario.hourly);
  const [daily, setDaily] = useState<DailyForecast[]>(defaultScenario.daily);
  const [alerts, setAlerts] = useState<WeatherAlert[]>(defaultScenario.alerts);

  // Cross-surface AI Orchestration State
  const [incomingMapAction, setIncomingMapAction] = useState<MapAction | null>(null);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);

  // Fetch or orchestrate data when location changes
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/weather/current?city=${encodeURIComponent(currentLocation.name)}&lat=${currentLocation.latitude}&lng=${currentLocation.longitude}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setObservation(json.data.observation);
            if (json.data.alerts) setAlerts(json.data.alerts);
          }
        }

        const fRes = await fetch(`/api/weather/forecast?city=${encodeURIComponent(currentLocation.name)}`);
        if (fRes.ok) {
          const fJson = await fRes.json();
          if (fJson.success && fJson.data) {
            setHourly(fJson.data.hourly);
            setDaily(fJson.data.daily);
          }
        }
      } catch (err) {
        console.warn('Weather sync error, retaining calibrated data:', err);
      }
    }

    loadData();
  }, [currentLocation]);

  // Handle AI Chat triggering a Map Workspace action
  const handleTriggerMapAction = (action: MapAction) => {
    setIncomingMapAction(action);
    setCurrentLocation(action.location);
    setActiveTab('map');
  };

  // Handle Flagship Scenario Selection from Sidebar
  const handleSelectFlagshipScenario = (scenarioKey: string, prompt: string) => {
    if (scenarioKey === 'BENGALURU_RAIN' || scenarioKey === 'BENGALURU_FLOOD') {
      setCurrentLocation(POPULAR_INDIAN_LOCATIONS[0]); // Bengaluru
    } else if (scenarioKey === 'MYSURU_FARMER') {
      setCurrentLocation(POPULAR_INDIAN_LOCATIONS[1]); // Mysuru
    } else if (scenarioKey === 'CHENNAI_CYCLONE') {
      setCurrentLocation(POPULAR_INDIAN_LOCATIONS[2]); // Chennai
    }

    if (scenarioKey === 'BENGALURU_FLOOD') {
      // Trigger GIS Map directly
      setIncomingMapAction({
        type: 'OPEN_WEATHER_MAP',
        location: POPULAR_INDIAN_LOCATIONS[0],
        targetLayers: ['radar', 'precipitation', 'flood_risk'],
        zoomLevel: 12,
        reason: 'Bengaluru Urban Flood Inundation Hotspots'
      });
      setActiveTab('map');
    } else {
      setInitialPrompt(prompt);
      setActiveTab('chat');
    }
  };

  // View Alert on Map
  const handleViewAlertOnMap = (alert: WeatherAlert) => {
    if (alert.coordinates) {
      setIncomingMapAction({
        type: 'OPEN_WEATHER_MAP',
        location: {
          name: alert.affectedDistricts[0] || currentLocation.name,
          country: 'India',
          latitude: alert.coordinates[0],
          longitude: alert.coordinates[1]
        },
        targetLayers: alert.hazardType === 'CYCLONE' ? ['cyclone'] : ['precipitation', 'flood_risk'],
        zoomLevel: 11,
        reason: alert.title
      });
      setActiveTab('map');
    } else {
      setActiveTab('map');
    }
  };

  return (
    <div className={`min-h-screen flex ${isDark ? 'dark bg-slate-950 text-slate-100' : 'light bg-slate-50 text-slate-900'}`}>
      {/* 1. Desktop Persistent Glassmorphic Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        onSelectFlagshipScenario={handleSelectFlagshipScenario}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* 2. Main Workspace Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <TopBar
          currentLocation={currentLocation}
          onSelectLocation={setCurrentLocation}
          alerts={alerts}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onViewAlertOnMap={handleViewAlertOnMap}
        />

        {/* Surface Router */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {activeTab === 'chat' && (
            <ChatContainer
              currentLocation={currentLocation}
              language={language}
              onTriggerMapAction={handleTriggerMapAction}
              initialPrompt={initialPrompt}
              onConsumeInitialPrompt={() => setInitialPrompt(undefined)}
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardView
              currentLocation={currentLocation}
              observation={observation}
              hourly={hourly}
              daily={daily}
              alerts={alerts}
              setActiveTab={setActiveTab}
              onAskChat={(p) => {
                setInitialPrompt(p);
                setActiveTab('chat');
              }}
            />
          )}

          {activeTab === 'map' && (
            <WeatherMapWorkspace
              currentLocation={currentLocation}
              onSelectLocation={setCurrentLocation}
              incomingMapAction={incomingMapAction}
              onClearMapAction={() => setIncomingMapAction(null)}
            />
          )}

          {activeTab === 'insights' && (
            <ClimateTrendsWorkspace
              currentLocation={currentLocation}
              onSelectLocation={setCurrentLocation}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsCenter
              alerts={alerts}
              currentLocation={currentLocation}
              setActiveTab={setActiveTab}
              onViewAlertOnMap={handleViewAlertOnMap}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPanel
              currentLocation={currentLocation}
              onSelectLocation={setCurrentLocation}
              language={language}
              setLanguage={setLanguage}
              isDark={isDark}
              setIsDark={setIsDark}
            />
          )}
        </main>

        {/* 3. Mobile Navigation Bar */}
        <MobileNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          alertCount={alerts.filter(a => a.severity === 'RED' || a.severity === 'ORANGE').length}
        />
      </div>
    </div>
  );
}
