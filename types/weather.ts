export type RiskLevel = 'LOW' | 'ELEVATED' | 'HIGH' | 'SEVERE' | 'CRITICAL';

export type AlertSeverity = 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';

export type DecisionDomain = 
  | 'TRAVEL'
  | 'AGRICULTURE'
  | 'DISASTER'
  | 'SCHOOLS'
  | 'AVIATION'
  | 'MARINE';

export interface LocationInfo {
  name: string;
  state?: string;
  country: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  timezone?: string;
}

export interface WeatherObservation {
  location: LocationInfo;
  timestamp: string;
  temperature: number; // °C
  feelsLike: number;
  humidity: number; // %
  pressure: number; // hPa
  windSpeed: number; // km/h
  windDirection: number; // degrees
  windGust?: number;
  precipitation: number; // mm
  precipitationProbability: number; // %
  weatherCode: number;
  weatherDescription: string;
  visibility: number; // km
  uvIndex: number;
  airQualityIndex?: number;
  aqiStatus?: string;
  source: string;
  isSimulated: boolean;
}

export interface HourlyForecast {
  time: string; // ISO
  displayTime: string; // "14:00"
  temperature: number;
  feelsLike: number;
  precipitationProbability: number;
  precipitationAmount: number;
  weatherCode: number;
  weatherDescription: string;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  visibility: number;
  riskLevel: RiskLevel;
}

export interface DailyForecast {
  date: string; // "2026-09-26"
  dayOfWeek: string; // "Saturday"
  tempMax: number;
  tempMin: number;
  precipitationProbability: number;
  precipitationTotal: number;
  weatherCode: number;
  weatherDescription: string;
  uvIndexMax: number;
  windSpeedMax: number;
  riskLevel: RiskLevel;
}

export interface WeatherAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  hazardType: 'RAIN' | 'FLOOD' | 'CYCLONE' | 'HEATWAVE' | 'THUNDERSTORM' | 'LANDSLIDE';
  description: string;
  affectedDistricts: string[];
  validFrom: string;
  validUntil: string;
  issuedAt: string;
  source: string;
  recommendedPrecautions: string[];
  coordinates?: [number, number];
  polygon?: [number, number][];
}

export interface DecisionSupportItem {
  domain: DecisionDomain;
  domainName: string;
  iconName: string;
  riskLevel: RiskLevel;
  headline: string;
  actionableRecommendation: string;
  evidence: string[];
  safeWindows?: string[];
  cautionWindows?: string[];
}

export interface MapAction {
  type: 'OPEN_WEATHER_MAP' | 'FOCUS_LOCATION' | 'TOGGLE_LAYER';
  location: LocationInfo;
  targetLayers: ('radar' | 'precipitation' | 'temperature' | 'wind' | 'flood_risk' | 'cyclone' | 'alerts')[];
  forecastTime?: string;
  highlightCoordinates?: [number, number];
  zoomLevel?: number;
  reason: string;
}

export interface DataProvenance {
  providerName: string;
  model: string;
  observationTime: string;
  forecastIssueTime: string;
  retrievalTimestamp: string;
  isSimulated: boolean;
  notes?: string;
}

export interface ConfidenceMetric {
  score: number; // 0 - 100%
  label: string; // "High Model Agreement"
  factors: {
    name: string;
    score: number;
    description: string;
  }[];
}

export interface QueryIntent {
  originalQuery: string;
  location: string;
  extractedLocation?: LocationInfo;
  timeRange: 'current' | 'today' | 'tomorrow' | 'weekend' | 'specific_date' | 'historical';
  targetDate?: string;
  targetHour?: number;
  intents: ('forecast' | 'travel_safety' | 'agriculture' | 'flood_risk' | 'cyclone' | 'historical_compare' | 'school_advisory')[];
  primaryDomain?: DecisionDomain;
  isFlagshipScenario?: 'BENGALURU_RAIN_TRAVEL' | 'MYSURU_FARMER' | 'CHENNAI_CYCLONE' | 'BENGALURU_FLOOD' | 'CLIMATE_COMPARE';
  requiresMap: boolean;
}

export interface StructuredAIResponse {
  query: string;
  parsedIntent: QueryIntent;
  forecastSummary: string;
  observation: WeatherObservation;
  hourlyHighlights: HourlyForecast[];
  dailyHighlights?: DailyForecast[];
  decisionSupport: DecisionSupportItem[];
  activeAlerts: WeatherAlert[];
  mapAction?: MapAction;
  confidence: ConfidenceMetric;
  provenance: DataProvenance;
  followUpSuggestions: string[];
  language: string;
  timestamp: string;
}

export interface HistoricalClimateData {
  city: string;
  yearA: number;
  yearB: number;
  monthlyRainfallA: number[]; // Jan - Dec
  monthlyRainfallB: number[];
  monthlyTempA: number[];
  monthlyTempB: number[];
  annualRainfallDeltaPercent: number;
  meanTempDelta: number;
  extremeHeatDaysA: number;
  extremeHeatDaysB: number;
  extremeRainDaysA: number;
  extremeRainDaysB: number;
  aiInterpretation: string;
}
