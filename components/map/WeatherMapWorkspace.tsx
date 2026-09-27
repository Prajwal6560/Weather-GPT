'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  Layers, 
  Sliders, 
  Search, 
  Crosshair, 
  ShieldAlert, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Waves,
  Eye,
  Info
} from 'lucide-react';
import { LocationInfo, MapAction } from '@/types/weather';
import { INDIAN_GIS_RISK_ZONES, BAY_OF_BENGAL_CYCLONE_TRACK, DOPPLER_RADAR_STATIONS } from '@/lib/gis/data';
import { POPULAR_INDIAN_LOCATIONS } from '@/lib/weather/locations';

interface WeatherMapWorkspaceProps {
  currentLocation: LocationInfo;
  onSelectLocation: (loc: LocationInfo) => void;
  incomingMapAction?: MapAction | null;
  onClearMapAction?: () => void;
}

export function WeatherMapWorkspace({
  currentLocation,
  onSelectLocation,
  incomingMapAction,
  onClearMapAction
}: WeatherMapWorkspaceProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersGroupRef = useRef<any>(null);

  // Layer States
  const [activeLayers, setActiveLayers] = useState({
    precipitation: true,
    flood_risk: true,
    cyclone: true,
    radar_stations: true,
    temperature: false,
    wind: false,
  });

  const [opacity, setOpacity] = useState(0.85);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);

  const timelineSteps = [
    'NOW (Live Sweep)',
    '+3h (Afternoon Convection)',
    '+6h (Peak Precipitation)',
    '+9h (Evening Decay)',
    '+12h (Night Fair)',
    '+18h (Next Morning)',
    '+24h (24h Accumulated)'
  ];

  // Apply Incoming AI Map Action (e.g. from Chat query "Show me flood risk around Bengaluru")
  useEffect(() => {
    if (incomingMapAction && isMapReady && mapInstanceRef.current) {
      const loc = incomingMapAction.location;
      mapInstanceRef.current.setView([loc.latitude, loc.longitude], incomingMapAction.zoomLevel || 12);
      
      // Update active layers to match AI action
      if (incomingMapAction.targetLayers.length > 0) {
        setActiveLayers(prev => ({
          ...prev,
          precipitation: incomingMapAction.targetLayers.includes('precipitation') || incomingMapAction.targetLayers.includes('radar'),
          flood_risk: incomingMapAction.targetLayers.includes('flood_risk'),
          cyclone: incomingMapAction.targetLayers.includes('cyclone'),
        }));
      }

      if (onClearMapAction) onClearMapAction();
    }
  }, [incomingMapAction, isMapReady]);

  // Leaflet Map Initialization
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = (await import('leaflet')).default;

      if (!mapInstanceRef.current && mapContainerRef.current) {
        // Initialize Map with dark CartoDB tile layer
        const map = L.map(mapContainerRef.current, {
          center: [currentLocation.latitude, currentLocation.longitude],
          zoom: 11,
          zoomControl: false,
        });

        // Add Dark Matter Tile Layer (Modern GIS aesthetic)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 19,
        }).addTo(map);

        // Add Zoom Control at bottom right
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        layersGroupRef.current = L.layerGroup().addTo(map);
        mapInstanceRef.current = map;
        if (isMounted) setIsMapReady(true);
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Map Position when currentLocation changes
  useEffect(() => {
    if (mapInstanceRef.current && isMapReady) {
      mapInstanceRef.current.setView([currentLocation.latitude, currentLocation.longitude], 11);
    }
  }, [currentLocation, isMapReady]);

  // Render Overlays & Risk Polygons dynamically
  useEffect(() => {
    async function renderLayers() {
      if (!mapInstanceRef.current || !layersGroupRef.current || !isMapReady) return;
      const L = (await import('leaflet')).default;

      layersGroupRef.current.clearLayers();

      // 1. Current Location Marker
      const centerIcon = L.divIcon({
        className: 'custom-pin',
        html: `<div class="relative flex items-center justify-center">
                 <div class="w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow-lg animate-ping"></div>
                 <div class="w-3 h-3 rounded-full bg-cyan-400 border-2 border-white absolute"></div>
               </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
      L.marker([currentLocation.latitude, currentLocation.longitude], { icon: centerIcon })
        .bindPopup(`<b>${currentLocation.name}</b><br/>Monitored GIS Node`)
        .addTo(layersGroupRef.current);

      // 2. Flood Risk Polygons (e.g. Bengaluru Bellandur, Silk Board)
      if (activeLayers.flood_risk) {
        INDIAN_GIS_RISK_ZONES.filter(z => z.category === 'FLOOD').forEach(zone => {
          const poly = L.polygon(zone.coordinates as any, {
            color: zone.severity === 'CRITICAL' ? '#f43f5e' : '#f59e0b',
            fillColor: zone.severity === 'CRITICAL' ? '#f43f5e' : '#f59e0b',
            fillOpacity: opacity * 0.45,
            weight: 2,
            dashArray: '4, 4'
          }).bindPopup(`
            <div style="font-family: inherit; font-size: 12px; color: #0f172a;">
              <strong style="color: #e11d48;">🚨 ${zone.name}</strong><br/>
              <b>Severity:</b> ${zone.severity}<br/>
              <b>Vulnerability:</b> ${zone.description}
            </div>
          `);
          poly.addTo(layersGroupRef.current);
        });
      }

      // 3. Cyclone Trajectory Track & Coastal Surge Polygons (e.g. Chennai)
      if (activeLayers.cyclone) {
        // Track line
        const latlngs = BAY_OF_BENGAL_CYCLONE_TRACK.map(pt => [pt.lat, pt.lng]);
        L.polyline(latlngs as any, {
          color: '#ec4899',
          weight: 3,
          dashArray: '6, 6',
          opacity: opacity
        }).addTo(layersGroupRef.current);

        // Track points
        BAY_OF_BENGAL_CYCLONE_TRACK.forEach(pt => {
          const marker = L.circleMarker([pt.lat, pt.lng], {
            radius: pt.windKmh > 75 ? 8 : 5,
            color: '#ec4899',
            fillColor: '#f43f5e',
            fillOpacity: 0.8
          }).bindPopup(`
            <div style="font-family: inherit; font-size: 12px; color: #0f172a;">
              <strong>🌀 ${pt.intensity}</strong><br/>
              <b>Time Horizon:</b> ${pt.time}<br/>
              <b>Gale Velocity:</b> ${pt.windKmh} km/h<br/>
              <b>Barometric Core:</b> ${pt.pressureHpa} hPa
            </div>
          `);
          marker.addTo(layersGroupRef.current);
        });

        // Cyclone surge polygons
        INDIAN_GIS_RISK_ZONES.filter(z => z.category === 'CYCLONE').forEach(zone => {
          L.polygon(zone.coordinates as any, {
            color: '#ec4899',
            fillColor: '#ec4899',
            fillOpacity: opacity * 0.4,
            weight: 2
          }).bindPopup(`<b>Storm Surge Hazard:</b> ${zone.name}`)
            .addTo(layersGroupRef.current);
        });
      }

      // 4. Precipitation / Radar Simulated Convective Footprint
      if (activeLayers.precipitation) {
        // Dynamic simulated precipitation radius based on timeline
        const timeFactor = timelineIndex === 2 ? 1.6 : timelineIndex === 1 ? 1.2 : 0.9;
        const rainRadius = 18000 * timeFactor;

        L.circle([currentLocation.latitude + 0.02, currentLocation.longitude + 0.04], {
          radius: rainRadius,
          color: '#06b6d4',
          fillColor: '#06b6d4',
          fillOpacity: opacity * 0.35,
          weight: 1
        }).bindPopup(`<b>Radar Reflectivity (45 dBZ)</b><br/>Rainfall intensity: ~14 mm/h`)
          .addTo(layersGroupRef.current);
      }

      // 5. Doppler Weather Radar Stations
      if (activeLayers.radar_stations) {
        DOPPLER_RADAR_STATIONS.forEach(station => {
          L.circleMarker([station.lat, station.lng], {
            radius: 6,
            color: '#3b82f6',
            fillColor: '#60a5fa',
            fillOpacity: 0.9
          }).bindPopup(`<b>${station.name}</b><br/>Status: ${station.status}<br/>Telemetry Range: ${station.rangeKm} km`)
            .addTo(layersGroupRef.current);
        });
      }
    }

    renderLayers();
  }, [activeLayers, opacity, timelineIndex, currentLocation, isMapReady]);

  // Timeline Animation Loop
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setTimelineIndex(prev => (prev + 1) % timelineSteps.length);
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] md:h-screen relative overflow-hidden bg-slate-950">
      {/* Map Control Overlay Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Location Search Bar */}
        <div className="glass-panel p-1.5 rounded-2xl flex items-center gap-2 pointer-events-auto shadow-2xl border border-slate-700/80 w-full sm:w-80">
          <Search className="w-4 h-4 ml-2 text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder="Jump to city or basin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <div className="absolute top-12 left-0 w-80 glass-panel rounded-xl p-2 z-50 border border-slate-700 max-h-48 overflow-y-auto">
              {POPULAR_INDIAN_LOCATIONS.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase())).map(l => (
                <button
                  key={l.name}
                  onClick={() => {
                    onSelectLocation(l);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-slate-200 hover:bg-slate-800"
                >
                  {l.name}, {l.state}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Layer Quick Toggles */}
        <div className="glass-panel px-3 py-1.5 rounded-2xl flex items-center gap-2 pointer-events-auto border border-slate-700/80 overflow-x-auto">
          <button
            onClick={() => setActiveLayers(prev => ({ ...prev, precipitation: !prev.precipitation }))}
            className={`px-2.5 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeLayers.precipitation ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Radar Rain</span>
          </button>

          <button
            onClick={() => setActiveLayers(prev => ({ ...prev, flood_risk: !prev.flood_risk }))}
            className={`px-2.5 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeLayers.flood_risk ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Flood Zones</span>
          </button>

          <button
            onClick={() => setActiveLayers(prev => ({ ...prev, cyclone: !prev.cyclone }))}
            className={`px-2.5 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeLayers.cyclone ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Cyclone Track</span>
          </button>
        </div>
      </div>

      {/* Main Leaflet Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Bottom Timeline & Playback Bar */}
      <div className="absolute bottom-6 left-4 right-4 z-10 pointer-events-none flex justify-center">
        <div className="glass-panel p-3.5 rounded-2xl border border-slate-700/80 pointer-events-auto shadow-2xl max-w-2xl w-full space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center transition-colors"
                title={isPlaying ? 'Pause Playback' : 'Play Timeline'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>
              <span className="font-semibold text-slate-100">{timelineSteps[timelineIndex]}</span>
            </div>
            
            {/* Opacity slider */}
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <Sliders className="w-3 h-3 text-cyan-400" />
              <span>Opacity:</span>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-16 accent-cyan-400"
              />
            </div>
          </div>

          {/* Stepped Progress Bar */}
          <div className="grid grid-cols-7 gap-1">
            {timelineSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTimelineIndex(idx);
                  setIsPlaying(false);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === timelineIndex 
                    ? 'bg-cyan-400 shadow-sm shadow-cyan-400/80' 
                    : idx < timelineIndex 
                      ? 'bg-cyan-800' 
                      : 'bg-slate-800'
                }`}
                title={step}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
