import { 
  WeatherObservation, 
  HourlyForecast, 
  DailyForecast, 
  WeatherAlert, 
  LocationInfo,
  HistoricalClimateData
} from '@/types/weather';
import { POPULAR_INDIAN_LOCATIONS } from '../locations';

export interface SimulationPayload {
  observation: WeatherObservation;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts: WeatherAlert[];
}

export function getBengaluruRainScenario(): SimulationPayload {
  const loc: LocationInfo = POPULAR_INDIAN_LOCATIONS[0]; // Bengaluru
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const hourly: HourlyForecast[] = [
    { time: `${tomorrowStr}T06:00:00Z`, displayTime: '06:00', temperature: 20, feelsLike: 20, precipitationProbability: 10, precipitationAmount: 0, weatherCode: 1, weatherDescription: 'Mainly Clear', windSpeed: 9, windDirection: 110, humidity: 82, visibility: 8, riskLevel: 'LOW' },
    { time: `${tomorrowStr}T08:00:00Z`, displayTime: '08:00', temperature: 23, feelsLike: 23, precipitationProbability: 15, precipitationAmount: 0, weatherCode: 2, weatherDescription: 'Partly Cloudy', windSpeed: 11, windDirection: 115, humidity: 75, visibility: 9, riskLevel: 'LOW' },
    { time: `${tomorrowStr}T10:00:00Z`, displayTime: '10:00', temperature: 26, feelsLike: 27, precipitationProbability: 20, precipitationAmount: 0.2, weatherCode: 2, weatherDescription: 'Scattered Clouds', windSpeed: 14, windDirection: 120, humidity: 68, visibility: 10, riskLevel: 'LOW' },
    { time: `${tomorrowStr}T12:00:00Z`, displayTime: '12:00', temperature: 28, feelsLike: 29, precipitationProbability: 35, precipitationAmount: 1.2, weatherCode: 3, weatherDescription: 'Overcast, Pre-monsoon build-up', windSpeed: 16, windDirection: 130, humidity: 65, visibility: 9, riskLevel: 'LOW' },
    { time: `${tomorrowStr}T14:00:00Z`, displayTime: '14:00', temperature: 27, feelsLike: 28, precipitationProbability: 60, precipitationAmount: 4.5, weatherCode: 61, weatherDescription: 'Light to Moderate Showers', windSpeed: 20, windDirection: 140, humidity: 76, visibility: 7, riskLevel: 'ELEVATED' },
    { time: `${tomorrowStr}T15:00:00Z`, displayTime: '15:00', temperature: 24, feelsLike: 24, precipitationProbability: 85, precipitationAmount: 11.2, weatherCode: 65, weatherDescription: 'Heavy Rain & Thunder', windSpeed: 28, windDirection: 155, humidity: 88, visibility: 4, riskLevel: 'HIGH' },
    { time: `${tomorrowStr}T16:00:00Z`, displayTime: '16:00', temperature: 22, feelsLike: 22, precipitationProbability: 92, precipitationAmount: 14.8, weatherCode: 95, weatherDescription: 'Intense Downpour & Squall', windSpeed: 34, windDirection: 160, humidity: 94, visibility: 2.5, riskLevel: 'CRITICAL' },
    { time: `${tomorrowStr}T17:00:00Z`, displayTime: '17:00', temperature: 21, feelsLike: 21, precipitationProbability: 88, precipitationAmount: 12.0, weatherCode: 65, weatherDescription: 'Heavy Rain Showers', windSpeed: 29, windDirection: 150, humidity: 95, visibility: 3, riskLevel: 'HIGH' },
    { time: `${tomorrowStr}T18:00:00Z`, displayTime: '18:00', temperature: 21, feelsLike: 21, precipitationProbability: 75, precipitationAmount: 6.0, weatherCode: 63, weatherDescription: 'Moderate Steady Rain', windSpeed: 22, windDirection: 145, humidity: 92, visibility: 5, riskLevel: 'ELEVATED' },
    { time: `${tomorrowStr}T20:00:00Z`, displayTime: '20:00', temperature: 20, feelsLike: 20, precipitationProbability: 40, precipitationAmount: 1.5, weatherCode: 53, weatherDescription: 'Intermittent Drizzle', windSpeed: 15, windDirection: 135, humidity: 89, visibility: 7, riskLevel: 'LOW' },
    { time: `${tomorrowStr}T22:00:00Z`, displayTime: '22:00', temperature: 19, feelsLike: 19, precipitationProbability: 20, precipitationAmount: 0.3, weatherCode: 3, weatherDescription: 'Cool Overcast', windSpeed: 10, windDirection: 120, humidity: 88, visibility: 8, riskLevel: 'LOW' }
  ];

  const daily: DailyForecast[] = [
    { date: tomorrowStr, dayOfWeek: 'Tomorrow', tempMax: 28, tempMin: 19, precipitationProbability: 92, precipitationTotal: 50.2, weatherCode: 65, weatherDescription: 'Heavy Afternoon Thunderstorms', uvIndexMax: 6, windSpeedMax: 34, riskLevel: 'HIGH' },
    { date: 'Day +2', dayOfWeek: 'Day +2', tempMax: 29, tempMin: 19, precipitationProbability: 45, precipitationTotal: 8.5, weatherCode: 61, weatherDescription: 'Scattered Evening Showers', uvIndexMax: 7, windSpeedMax: 20, riskLevel: 'MODERATE' as any },
    { date: 'Day +3', dayOfWeek: 'Day +3', tempMax: 30, tempMin: 18, precipitationProbability: 20, precipitationTotal: 1.0, weatherCode: 2, weatherDescription: 'Pleasant & Partly Cloudy', uvIndexMax: 8, windSpeedMax: 14, riskLevel: 'LOW' },
    { date: 'Day +4', dayOfWeek: 'Day +4', tempMax: 30, tempMin: 18, precipitationProbability: 15, precipitationTotal: 0, weatherCode: 1, weatherDescription: 'Clear Sunny Skies', uvIndexMax: 8, windSpeedMax: 12, riskLevel: 'LOW' },
    { date: 'Day +5', dayOfWeek: 'Day +5', tempMax: 29, tempMin: 19, precipitationProbability: 25, precipitationTotal: 0.5, weatherCode: 2, weatherDescription: 'Mainly Fair', uvIndexMax: 7, windSpeedMax: 15, riskLevel: 'LOW' },
  ];

  const alerts: WeatherAlert[] = [
    {
      id: 'BLR-WARN-2026-0925',
      severity: 'ORANGE',
      title: 'Heavy Rainfall & Waterlogging Alert',
      hazardType: 'RAIN',
      description: 'IMD regional meteorological center has upgraded Bengaluru Urban & Rural to Orange Alert. Intense convective showers with rainfall rates up to 35-50 mm/3h anticipated in the late afternoon.',
      affectedDistricts: ['Bengaluru Urban', 'Bengaluru South', 'Outer Ring Road Corridor', 'Electronic City', 'Bellandur'],
      validFrom: `${tomorrowStr}T14:00:00Z`,
      validUntil: `${tomorrowStr}T20:00:00Z`,
      issuedAt: new Date(now.getTime() - 2 * 3600000).toISOString(),
      source: 'India Meteorological Department (IMD) Bengaluru Center',
      recommendedPrecautions: [
        'Plan road commute before 2:00 PM or after 8:00 PM to avoid peak traffic gridlock.',
        'Anticipate severe delays at known bottlenecks: Silk Board, Marathahalli, Ecospace, and Hebbal flyover.',
        'Avoid parking vehicles near storm drains or under weakened trees.',
        'Keep emergency helpline BBMP Sahaya 1533 on standby.'
      ],
      coordinates: [loc.latitude, loc.longitude],
      polygon: [
        [12.9100, 77.5600],
        [13.0200, 77.5600],
        [13.0400, 77.6900],
        [12.8900, 77.6900]
      ]
    }
  ];

  const observation: WeatherObservation = {
    location: loc,
    timestamp: now.toISOString(),
    temperature: 24.5,
    feelsLike: 25.2,
    humidity: 78,
    pressure: 1011,
    windSpeed: 14,
    windDirection: 125,
    windGust: 22,
    precipitation: 0.4,
    precipitationProbability: 30,
    weatherCode: 3,
    weatherDescription: 'Overcast with Rising Convective Clouds',
    visibility: 8.5,
    uvIndex: 4,
    airQualityIndex: 48,
    aqiStatus: 'Good (AQI 48)',
    source: 'Open-Meteo High-Res NWP Ensemble (Live Verified with IMD Station)',
    isSimulated: true
  };

  return { observation, hourly, daily, alerts };
}

export function getMysuruFarmerScenario(): SimulationPayload {
  const loc: LocationInfo = POPULAR_INDIAN_LOCATIONS[1]; // Mysuru
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const hourly: HourlyForecast[] = [
    { time: `${tomorrowStr}T06:00:00Z`, displayTime: '06:00', temperature: 21, feelsLike: 21, precipitationProbability: 15, precipitationAmount: 0, weatherCode: 2, weatherDescription: 'Partly Cloudy', windSpeed: 8, windDirection: 120, humidity: 84, visibility: 9, riskLevel: 'LOW' },
    { time: `${tomorrowStr}T10:00:00Z`, displayTime: '10:00', temperature: 26, feelsLike: 27, precipitationProbability: 40, precipitationAmount: 1.5, weatherCode: 61, weatherDescription: 'Developing Showers', windSpeed: 18, windDirection: 140, humidity: 72, visibility: 8, riskLevel: 'MODERATE' as any },
    { time: `${tomorrowStr}T13:00:00Z`, displayTime: '13:00', temperature: 27, feelsLike: 28, precipitationProbability: 75, precipitationAmount: 8.4, weatherCode: 63, weatherDescription: 'Moderate Steady Rain', windSpeed: 24, windDirection: 160, humidity: 85, visibility: 6, riskLevel: 'HIGH' },
    { time: `${tomorrowStr}T16:00:00Z`, displayTime: '16:00', temperature: 24, feelsLike: 25, precipitationProbability: 80, precipitationAmount: 12.0, weatherCode: 65, weatherDescription: 'Heavy Agricultural Showers', windSpeed: 28, windDirection: 170, humidity: 91, visibility: 5, riskLevel: 'HIGH' },
    { time: `${tomorrowStr}T19:00:00Z`, displayTime: '19:00', temperature: 22, feelsLike: 22, precipitationProbability: 35, precipitationAmount: 0.8, weatherCode: 51, weatherDescription: 'Light Drizzle', windSpeed: 14, windDirection: 140, humidity: 88, visibility: 7, riskLevel: 'LOW' }
  ];

  const daily: DailyForecast[] = [
    { date: tomorrowStr, dayOfWeek: 'Tomorrow', tempMax: 28, tempMin: 20, precipitationProbability: 80, precipitationTotal: 22.7, weatherCode: 63, weatherDescription: 'Moderate Rain & Gusty Wind', uvIndexMax: 6, windSpeedMax: 28, riskLevel: 'HIGH' },
    { date: 'Friday', dayOfWeek: 'Friday', tempMax: 30, tempMin: 19, precipitationProbability: 10, precipitationTotal: 0, weatherCode: 1, weatherDescription: 'Calm & Dry (Optimal Spraying)', uvIndexMax: 8, windSpeedMax: 9, riskLevel: 'LOW' },
    { date: 'Saturday', dayOfWeek: 'Saturday', tempMax: 31, tempMin: 18, precipitationProbability: 5, precipitationTotal: 0, weatherCode: 0, weatherDescription: 'Clear Sunshine', uvIndexMax: 9, windSpeedMax: 8, riskLevel: 'LOW' }
  ];

  const alerts: WeatherAlert[] = [
    {
      id: 'MYS-AGRI-2026-0925',
      severity: 'YELLOW',
      title: 'Farmer Advisory: Spraying & Field Wash-off Hazard',
      hazardType: 'RAIN',
      description: 'Karnataka State Disaster Management Authority & UAS Krishi Vigyan Kendra advise farmers against foliar spray applications tomorrow due to high runoff and pesticide wash-off risk.',
      affectedDistricts: ['Mysuru Rural', 'Nanjangud', 'Hunsur', 'T. Narasipura'],
      validFrom: `${tomorrowStr}T09:00:00Z`,
      validUntil: `${tomorrowStr}T18:00:00Z`,
      issuedAt: now.toISOString(),
      source: 'ICAR - Krishi Vigyan Kendra & IMD Agromet Advisory Service',
      recommendedPrecautions: [
        'Postpone chemical fertilizer and pesticide spraying until Friday morning.',
        'Ensure open field drainage channels in paddy and sugarcane plots to prevent root stagnation.',
        'Secure harvested crops and grain sacks under waterproof tarpaulins.'
      ],
      coordinates: [loc.latitude, loc.longitude]
    }
  ];

  const observation: WeatherObservation = {
    location: loc,
    timestamp: now.toISOString(),
    temperature: 25.8,
    feelsLike: 26.5,
    humidity: 74,
    pressure: 1012,
    windSpeed: 12,
    windDirection: 130,
    precipitation: 0.1,
    precipitationProbability: 25,
    weatherCode: 2,
    weatherDescription: 'Scattered Clouds',
    visibility: 9.0,
    uvIndex: 5,
    airQualityIndex: 38,
    aqiStatus: 'Good (AQI 38)',
    source: 'IMD Agromet Service + High-Resolution Simulation',
    isSimulated: true
  };

  return { observation, hourly, daily, alerts };
}

export function getChennaiCycloneScenario(): SimulationPayload {
  const loc: LocationInfo = POPULAR_INDIAN_LOCATIONS[2]; // Chennai
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const hourly: HourlyForecast[] = [
    { time: `${tomorrowStr}T06:00:00Z`, displayTime: '06:00', temperature: 27, feelsLike: 31, precipitationProbability: 70, precipitationAmount: 6.0, weatherCode: 63, weatherDescription: 'Heavy Squally Bands', windSpeed: 45, windDirection: 60, humidity: 90, visibility: 5, riskLevel: 'HIGH' },
    { time: `${tomorrowStr}T12:00:00Z`, displayTime: '12:00', temperature: 26, feelsLike: 30, precipitationProbability: 95, precipitationAmount: 26.0, weatherCode: 95, weatherDescription: 'Severe Cyclone Bands & Gales', windSpeed: 75, windDirection: 75, humidity: 96, visibility: 1.5, riskLevel: 'CRITICAL' },
    { time: `${tomorrowStr}T18:00:00Z`, displayTime: '18:00', temperature: 25, feelsLike: 29, precipitationProbability: 90, precipitationAmount: 18.0, weatherCode: 82, weatherDescription: 'Torrential Downpour & Surges', windSpeed: 68, windDirection: 85, humidity: 95, visibility: 2, riskLevel: 'CRITICAL' }
  ];

  const daily: DailyForecast[] = [
    { date: tomorrowStr, dayOfWeek: 'Tomorrow', tempMax: 27, tempMin: 24, precipitationProbability: 98, precipitationTotal: 95.0, weatherCode: 95, weatherDescription: 'Severe Cyclonic Storm Landfall', uvIndexMax: 3, windSpeedMax: 82, riskLevel: 'CRITICAL' as any },
    { date: 'Day +2', dayOfWeek: 'Day +2', tempMax: 29, tempMin: 25, precipitationProbability: 60, precipitationTotal: 25.0, weatherCode: 63, weatherDescription: 'Weakening Rain Bands', uvIndexMax: 5, windSpeedMax: 40, riskLevel: 'HIGH' }
  ];

  const alerts: WeatherAlert[] = [
    {
      id: 'CHN-CYC-2026-0925',
      severity: 'RED',
      title: 'IMD RED ALERT: Severe Cyclonic Storm in Bay of Bengal',
      hazardType: 'CYCLONE',
      description: 'Cyclone Tracking Bulletin #07: Severe cyclonic system centered 160 km ESE of Chennai moving WNW at 16 km/h. Gale winds of 70-85 km/h gusting to 100 km/h and storm tidal surge of 1.2m expected along coastal areas.',
      affectedDistricts: ['Chennai Corporation', 'Chengalpattu', 'Thiruvallur', 'Kanchipuram'],
      validFrom: `${tomorrowStr}T04:00:00Z`,
      validUntil: `${tomorrowStr}T23:59:00Z`,
      issuedAt: now.toISOString(),
      source: 'Regional Specialized Meteorological Centre (RSMC) / IMD New Delhi',
      recommendedPrecautions: [
        'Complete suspension of all marine, fishing, and boating activities.',
        'Residents of coastal and low-lying zones (Marina, Besant Nagar, Ennore) must move to designated storm shelters.',
        'Keep emergency supplies: drinking water, battery powerbanks, first-aid kits, non-perishable food.',
        'Avoid coastal highways and subway underpasses prone to inundation.'
      ],
      coordinates: [loc.latitude, loc.longitude]
    }
  ];

  const observation: WeatherObservation = {
    location: loc,
    timestamp: now.toISOString(),
    temperature: 28.2,
    feelsLike: 33.1,
    humidity: 89,
    pressure: 994, // low pressure cyclonic core
    windSpeed: 48,
    windDirection: 65,
    windGust: 64,
    precipitation: 12.0,
    precipitationProbability: 85,
    weatherCode: 65,
    weatherDescription: 'Squally Tropical Storm Winds & Cloud Bands',
    visibility: 4.2,
    uvIndex: 3,
    airQualityIndex: 25,
    aqiStatus: 'Good (AQI 25)',
    source: 'IMD Cyclone Warning Centre Chennai & RSMC',
    isSimulated: true
  };

  return { observation, hourly, daily, alerts };
}

export function getHistoricalClimateComparison(city: string = 'Bengaluru'): HistoricalClimateData {
  return {
    city,
    yearA: 2019,
    yearB: 2025,
    monthlyRainfallA: [4, 8, 18, 42, 110, 85, 120, 160, 210, 190, 60, 12],
    monthlyRainfallB: [2, 0, 5, 28, 145, 115, 140, 235, 290, 160, 85, 18],
    monthlyTempA: [21, 23, 26, 28, 28, 25, 24, 24, 24, 24, 23, 21],
    monthlyTempB: [22, 25, 28, 30, 29, 26, 25, 25, 25, 25, 24, 22],
    annualRainfallDeltaPercent: +18.4,
    meanTempDelta: +1.6,
    extremeHeatDaysA: 4,
    extremeHeatDaysB: 14,
    extremeRainDaysA: 7,
    extremeRainDaysB: 12,
    aiInterpretation: `Statistical comparison between 2019 and 2025 indicates a notable intensification in extreme weather metrics for ${city}. Mean annual temperatures rose by +1.6°C, accompanied by a 3.5× increase in days exceeding the 36°C heatwave threshold. While cumulative rainfall increased by +18.4%, precipitation became significantly more concentrated in short-duration, high-intensity cloudburst events (≥50mm/day), elevating urban waterlogging vulnerability.`
  };
}
