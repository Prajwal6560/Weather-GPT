import { QueryIntent, LocationInfo, DecisionDomain } from '@/types/weather';
import { findMatchingLocation, POPULAR_INDIAN_LOCATIONS } from '../weather/locations';

export function parseWeatherQuery(query: string, currentLocation?: LocationInfo): QueryIntent {
  const norm = query.toLowerCase().trim();
  
  // 1. Location Extraction
  let matchedLoc: LocationInfo | undefined = undefined;
  
  // First test known locations
  for (const loc of POPULAR_INDIAN_LOCATIONS) {
    if (norm.includes(loc.name.toLowerCase()) || (loc.state && norm.includes(loc.state.toLowerCase()))) {
      matchedLoc = loc;
      break;
    }
  }

  if (!matchedLoc && currentLocation) {
    matchedLoc = currentLocation;
  } else if (!matchedLoc) {
    // Default to Bengaluru for flagship SIH demo context
    matchedLoc = POPULAR_INDIAN_LOCATIONS[0];
  }

  // 2. Time Range Extraction
  let timeRange: QueryIntent['timeRange'] = 'today';
  let targetHour: number | undefined = undefined;

  if (norm.includes('tomorrow') || norm.includes('naale') || norm.includes('kal')) {
    timeRange = 'tomorrow';
  } else if (norm.includes('weekend')) {
    timeRange = 'weekend';
  } else if (norm.includes('yesterday') || norm.includes('2019') || norm.includes('compare') || norm.includes('historical') || norm.includes('trend')) {
    timeRange = 'historical';
  } else if (norm.includes('right now') || norm.includes('currently') || norm.includes('current')) {
    timeRange = 'current';
  }

  if (norm.includes('morning')) targetHour = 9;
  else if (norm.includes('afternoon')) targetHour = 15;
  else if (norm.includes('evening')) targetHour = 18;
  else if (norm.includes('night')) targetHour = 21;

  // 3. Intents Extraction
  const intents: QueryIntent['intents'] = [];
  let primaryDomain: DecisionDomain | undefined = undefined;

  if (norm.includes('travel') || norm.includes('drive') || norm.includes('commute') || norm.includes('flight') || norm.includes('safe to travel') || norm.includes('road')) {
    intents.push('travel_safety');
    primaryDomain = 'TRAVEL';
  }

  if (norm.includes('spray') || norm.includes('pesticide') || norm.includes('farmer') || norm.includes('crop') || norm.includes('harvest') || norm.includes('fertilizer')) {
    intents.push('agriculture');
    primaryDomain = 'AGRICULTURE';
  }

  if (norm.includes('flood') || norm.includes('waterlogging') || norm.includes('inundation') || norm.includes('drain')) {
    intents.push('flood_risk');
    primaryDomain = 'DISASTER';
  }

  if (norm.includes('cyclone') || norm.includes('storm') || norm.includes('gale') || norm.includes('hurricane') || norm.includes('typhoon')) {
    intents.push('cyclone');
    primaryDomain = 'DISASTER';
  }

  if (norm.includes('school') || norm.includes('sports') || norm.includes('children') || norm.includes('outdoor')) {
    intents.push('school_advisory');
    primaryDomain = 'SCHOOLS';
  }

  if (norm.includes('compare') || norm.includes('2019') || norm.includes('historical') || norm.includes('past')) {
    intents.push('historical_compare');
  }

  if (intents.length === 0) {
    intents.push('forecast');
  }

  // 4. Map Requirement
  const requiresMap = norm.includes('map') || 
                      norm.includes('show me') || 
                      norm.includes('radar') || 
                      norm.includes('flood') || 
                      norm.includes('cyclone track') ||
                      norm.includes('gis');

  // 5. Detect Flagship Scenario
  let isFlagshipScenario: QueryIntent['isFlagshipScenario'] = undefined;
  
  if (matchedLoc.name === 'Bengaluru' && (norm.includes('rain') || norm.includes('travel') || norm.includes('safe'))) {
    isFlagshipScenario = 'BENGALURU_RAIN_TRAVEL';
  } else if (norm.includes('pesticide') || (matchedLoc.name === 'Mysuru' && norm.includes('spray'))) {
    isFlagshipScenario = 'MYSURU_FARMER';
  } else if (matchedLoc.name === 'Chennai' && (norm.includes('cyclone') || norm.includes('storm') || norm.includes('alert'))) {
    isFlagshipScenario = 'CHENNAI_CYCLONE';
  } else if (norm.includes('flood') && matchedLoc.name === 'Bengaluru') {
    isFlagshipScenario = 'BENGALURU_FLOOD';
  } else if (norm.includes('compare') || norm.includes('2019')) {
    isFlagshipScenario = 'CLIMATE_COMPARE';
  }

  return {
    originalQuery: query,
    location: matchedLoc.name,
    extractedLocation: matchedLoc,
    timeRange,
    targetHour,
    intents,
    primaryDomain,
    isFlagshipScenario,
    requiresMap
  };
}
