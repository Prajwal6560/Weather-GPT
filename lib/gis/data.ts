export interface GisRiskZone {
  id: string;
  name: string;
  category: 'FLOOD' | 'CYCLONE' | 'LANDSLIDE' | 'HEATWAVE';
  severity: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  cityName: string;
  description: string;
  coordinates: [number, number][]; // Polygon coords [lat, lng]
  center: [number, number];
}

export interface CycloneTrackPoint {
  time: string;
  lat: number;
  lng: number;
  intensity: string;
  windKmh: number;
  pressureHpa: number;
}

export const INDIAN_GIS_RISK_ZONES: GisRiskZone[] = [
  {
    id: 'BLR-FLOOD-01',
    name: 'Bellandur & Varthur Lake Drainage Basin',
    category: 'FLOOD',
    severity: 'CRITICAL',
    cityName: 'Bengaluru',
    description: 'High runoff catchment prone to stormwater overflow, foam surges, and localized inundation during rainfall > 25mm/h.',
    center: [12.9360, 77.6740],
    coordinates: [
      [12.9250, 77.6600],
      [12.9500, 77.6620],
      [12.9550, 77.6950],
      [12.9300, 77.7100],
      [12.9180, 77.6800]
    ]
  },
  {
    id: 'BLR-FLOOD-02',
    name: 'Outer Ring Road (ORR) Ecospace - Marathahalli Corridor',
    category: 'FLOOD',
    severity: 'HIGH',
    cityName: 'Bengaluru',
    description: 'Arterial tech corridor with chronic waterlogging and severe transit blockades during convective afternoon downpours.',
    center: [12.9260, 77.6840],
    coordinates: [
      [12.9150, 77.6750],
      [12.9380, 77.6800],
      [12.9420, 77.6950],
      [12.9200, 77.6920]
    ]
  },
  {
    id: 'BLR-FLOOD-03',
    name: 'Silk Board Junction & Madivala Lake Basin',
    category: 'FLOOD',
    severity: 'HIGH',
    cityName: 'Bengaluru',
    description: 'Major transit confluence suffering backflow inundation when Madivala outflow sluice exceeds capacity.',
    center: [12.9175, 77.6230],
    coordinates: [
      [12.9100, 77.6150],
      [12.9250, 77.6180],
      [12.9280, 77.6320],
      [12.9120, 77.6300]
    ]
  },
  {
    id: 'CHN-CYC-01',
    name: 'Ennore Creek & Coastal Port Zone',
    category: 'CYCLONE',
    severity: 'CRITICAL',
    cityName: 'Chennai',
    description: 'Tidal storm surge inundation vulnerability zone during Bay of Bengal cyclonic depressions.',
    center: [13.2200, 80.3200],
    coordinates: [
      [13.1800, 80.2900],
      [13.2500, 80.3100],
      [13.2700, 80.3500],
      [13.1900, 80.3400]
    ]
  },
  {
    id: 'CHN-CYC-02',
    name: 'Marina Coastal Strip & Adyar Estuary',
    category: 'CYCLONE',
    severity: 'CRITICAL',
    cityName: 'Chennai',
    description: 'Direct oceanic wave breaker impact zone with 1.2m tidal swell hazard.',
    center: [13.0100, 80.2750],
    coordinates: [
      [12.9800, 80.2600],
      [13.0600, 80.2850],
      [13.0550, 80.3000],
      [12.9750, 80.2750]
    ]
  }
];

export const BAY_OF_BENGAL_CYCLONE_TRACK: CycloneTrackPoint[] = [
  { time: '12 Hours Ago', lat: 11.4, lng: 83.2, intensity: 'Deep Depression', windKmh: 55, pressureHpa: 1002 },
  { time: '6 Hours Ago', lat: 12.1, lng: 82.3, intensity: 'Cyclonic Storm', windKmh: 68, pressureHpa: 998 },
  { time: 'Current Position', lat: 12.8, lng: 81.5, intensity: 'Severe Cyclonic Storm', windKmh: 80, pressureHpa: 994 },
  { time: '+6h Projected', lat: 13.1, lng: 80.8, intensity: 'Coastal Landfall Zone', windKmh: 85, pressureHpa: 991 },
  { time: '+18h Projected', lat: 13.5, lng: 80.0, intensity: 'Weakening Inshore', windKmh: 60, pressureHpa: 997 }
];

export const DOPPLER_RADAR_STATIONS = [
  { name: 'Bengaluru DWR', lat: 12.9716, lng: 77.5946, rangeKm: 250, status: 'OPERATIONAL' },
  { name: 'Chennai DWR', lat: 13.0827, lng: 80.2707, rangeKm: 250, status: 'TRANSMITTING' },
  { name: 'Mumbai DWR', lat: 18.9220, lng: 72.8347, rangeKm: 250, status: 'OPERATIONAL' },
  { name: 'Delhi DWR', lat: 28.5850, lng: 77.2150, rangeKm: 250, status: 'OPERATIONAL' }
];
