import { 
  WeatherObservation, 
  HourlyForecast, 
  WeatherAlert, 
  DecisionSupportItem, 
  RiskLevel,
  DecisionDomain
} from '@/types/weather';

export function evaluateDecisionSupport(
  observation: WeatherObservation,
  hourly: HourlyForecast[],
  alerts: WeatherAlert[],
  requestedDomains?: DecisionDomain[]
): DecisionSupportItem[] {
  const items: DecisionSupportItem[] = [];

  // Calculate aggregate metrics over the next 12-24 hours
  const maxRain = Math.max(...hourly.map(h => h.precipitationAmount), observation.precipitation || 0);
  const maxProb = Math.max(...hourly.map(h => h.precipitationProbability), observation.precipitationProbability || 0);
  const maxWind = Math.max(...hourly.map(h => h.windSpeed), observation.windSpeed || 0);
  const minVisibility = Math.min(...hourly.map(h => h.visibility), observation.visibility || 10);
  const hasSevereWeather = hourly.some(h => [65, 82, 95, 96, 99].includes(h.weatherCode)) || alerts.some(a => a.severity === 'RED' || a.severity === 'ORANGE');

  // Find Safe and Caution Windows
  const safeHours: string[] = [];
  const cautionHours: string[] = [];

  hourly.slice(0, 14).forEach(h => {
    if (h.precipitationProbability >= 60 || h.precipitationAmount >= 5 || h.riskLevel === 'HIGH' || h.riskLevel === 'CRITICAL') {
      cautionHours.push(h.displayTime);
    } else if (h.precipitationProbability <= 20 && h.windSpeed < 20) {
      safeHours.push(h.displayTime);
    }
  });

  // Group continuous caution hours
  let cautionSummary = 'No high-risk windows identified';
  if (cautionHours.length > 0) {
    cautionSummary = `${cautionHours[0]} – ${cautionHours[cautionHours.length - 1]}`;
  }

  let safeSummary = 'Open travel window';
  if (safeHours.length > 0) {
    safeSummary = `${safeHours[0]} – ${safeHours[Math.min(safeHours.length - 1, 3)]}`;
  }

  // 1. TRAVEL DECISION SUPPORT
  let travelRisk: RiskLevel = 'LOW';
  let travelHeadline = 'Normal Commute Conditions';
  let travelAction = 'Standard travel precautions apply. No major meteorological impediments.';
  const travelEvidence: string[] = [];

  if (hasSevereWeather || maxRain > 12) {
    travelRisk = 'HIGH';
    travelHeadline = 'Severe Travel Disruption Risk';
    travelAction = `Elevated risk during peak precipitation (${cautionSummary}). Heavy downpours may induce road waterlogging and severe congestion. If possible, complete transit before ${safeHours[0] || 'early afternoon'}.`;
    travelEvidence.push(`Peak rainfall rate: up to ${maxRain} mm/h`);
    travelEvidence.push(`Reduced highway visibility down to ${minVisibility} km`);
    travelEvidence.push(`Precipitation probability exceeding ${maxProb}%`);
  } else if (maxProb >= 50 || maxRain >= 3 || maxWind >= 30) {
    travelRisk = 'ELEVATED';
    travelHeadline = 'Elevated Travel Delays Likely';
    travelAction = `Scattered showers expected between ${cautionSummary}. Commuters should anticipate 25-40% longer transit times and slick asphalt.`;
    travelEvidence.push(`Precipitation likelihood: ${maxProb}%`);
    travelEvidence.push(`Wind gusts reaching ${maxWind} km/h`);
  } else {
    travelEvidence.push(`Dry weather prevailing, precipitation probability < ${maxProb}%`);
    travelEvidence.push(`Good visibility: ${minVisibility} km`);
  }

  items.push({
    domain: 'TRAVEL',
    domainName: 'Travel & Mobility',
    iconName: 'Car',
    riskLevel: travelRisk,
    headline: travelHeadline,
    actionableRecommendation: travelAction,
    evidence: travelEvidence,
    safeWindows: safeHours.length > 0 ? [`Optimal window: ${safeSummary}`] : ['Early morning hours'],
    cautionWindows: cautionHours.length > 0 ? [`High congestion / waterlogging: ${cautionSummary}`] : []
  });

  // 2. AGRICULTURE DECISION SUPPORT
  let agriRisk: RiskLevel = 'LOW';
  let agriHeadline = 'Favorable Agricultural Conditions';
  let agriAction = 'Standard field operations, weeding, and irrigation can proceed normally.';
  const agriEvidence: string[] = [];

  if (maxRain > 8 || maxProb > 70) {
    agriRisk = 'HIGH';
    agriHeadline = 'High Chemical Wash-off & Stagnation Hazard';
    agriAction = 'Suspend all pesticide, herbicide, and top-dress fertilizer applications. Runoff will dilute active compounds and wash off foliar chemicals.';
    agriEvidence.push(`Precipitation probability: ${maxProb}%`);
    agriEvidence.push(`Expected rain accumulation: ${maxRain} mm/h`);
    agriEvidence.push('Ensure farm drainage canals are clear to prevent water stagnation in vegetable and root crop beds.');
  } else if (maxProb > 35 || maxWind > 20) {
    agriRisk = 'ELEVATED';
    agriHeadline = 'Moderate Spray Drift Risk';
    agriAction = `Caution advised during spraying. Wind speeds up to ${maxWind} km/h cause droplet drift away from target foliage.`;
    agriEvidence.push(`Wind speed: ${maxWind} km/h`);
    agriEvidence.push(`Intermittent moisture probability: ${maxProb}%`);
  } else {
    agriEvidence.push(`Low rain probability (<${maxProb}%)`);
    agriEvidence.push(`Calm wind conditions (${maxWind} km/h) optimal for uniform spray adherence`);
  }

  items.push({
    domain: 'AGRICULTURE',
    domainName: 'Agriculture & Farming',
    iconName: 'Wheat',
    riskLevel: agriRisk,
    headline: agriHeadline,
    actionableRecommendation: agriAction,
    evidence: agriEvidence,
    safeWindows: ['Friday morning onward optimal for field spraying'],
    cautionWindows: cautionHours.length > 0 ? [`Do not spray between: ${cautionSummary}`] : []
  });

  // 3. DISASTER MANAGEMENT & FLOOD RISK
  let disasterRisk: RiskLevel = 'LOW';
  let disasterHeadline = 'Low Threat Level';
  let disasterAction = 'Routine municipal monitoring. No heightened emergency activation required.';
  const disasterEvidence: string[] = [];

  if (alerts.some(a => a.severity === 'RED') || maxRain > 20) {
    disasterRisk = 'SEVERE';
    disasterHeadline = 'Red Alert: Critical Inundation & Squall Potential';
    disasterAction = 'Emergency Response Teams (SDRF/NDRF) on priority readiness. Deploy mobile de-watering pumps to known storm drain bottlenecks. Evacuate precarious low-lying settlements.';
    disasterEvidence.push('Official Red Warning in effect');
    disasterEvidence.push(`Peak rainfall rate ${maxRain} mm/h`);
  } else if (alerts.some(a => a.severity === 'ORANGE') || maxRain > 10) {
    disasterRisk = 'HIGH';
    disasterHeadline = 'Heightened Urban Inundation Watch';
    disasterAction = 'Activate local ward emergency cells. Inspect stormwater overflow gates and clear trash screens at vulnerable culverts.';
    disasterEvidence.push(`Convective storm cells with potential water accumulation: ${maxRain} mm/h`);
    disasterEvidence.push(`IMD warning status: ORANGE / WATCH`);
  } else if (maxProb > 50) {
    disasterRisk = 'ELEVATED';
    disasterHeadline = 'Localized Waterlogging Monitoring';
    disasterAction = 'Monitor highway underpasses and subterranean transit routes during afternoon downpours.';
    disasterEvidence.push(`Rainfall probability ${maxProb}%`);
  } else {
    disasterEvidence.push('No severe hydrometeorological anomalies detected.');
  }

  items.push({
    domain: 'DISASTER',
    domainName: 'Disaster Management & Civil Defense',
    iconName: 'ShieldAlert',
    riskLevel: disasterRisk,
    headline: disasterHeadline,
    actionableRecommendation: disasterAction,
    evidence: disasterEvidence
  });

  // 4. SCHOOLS & INSTITUTIONS
  let schoolRisk: RiskLevel = 'LOW';
  let schoolHeadline = 'Regular Campus Schedules';
  let schoolAction = 'Standard outdoor and sports activities can proceed as planned.';
  const schoolEvidence: string[] = [];

  if (hasSevereWeather || maxRain > 10) {
    schoolRisk = 'HIGH';
    schoolHeadline = 'Indoor Activity Mandate';
    schoolAction = 'Restrict students to indoor areas during afternoon hours. Adjust bus transit schedules to avoid peak rain gridlocks.';
    schoolEvidence.push('Lightning and heavy shower threat during dismissal hours');
    schoolEvidence.push(`Rainfall intensity: ${maxRain} mm/h`);
  } else if (observation.temperature > 37 || (observation.temperature > 34 && observation.humidity > 65)) {
    schoolRisk = 'ELEVATED';
    schoolHeadline = 'Heat Stress Advisory';
    schoolAction = 'Limit rigorous outdoor sports between 11:30 AM and 3:30 PM. Mandate frequent hydration breaks.';
    schoolEvidence.push(`Ambient temperature ${observation.temperature}°C with elevated heat index`);
  } else {
    schoolEvidence.push('Comfortable ambient temperature and dry conditions.');
  }

  items.push({
    domain: 'SCHOOLS',
    domainName: 'Schools & Institutions',
    iconName: 'School',
    riskLevel: schoolRisk,
    headline: schoolHeadline,
    actionableRecommendation: schoolAction,
    evidence: schoolEvidence
  });

  // 5. AVIATION & MARINE (Optional / Contextual)
  if (observation.location.name === 'Chennai' || observation.location.name === 'Mumbai' || observation.location.name === 'Kochi' || observation.location.name === 'Mangaluru') {
    let marineRisk: RiskLevel = 'LOW';
    let marineHeadline = 'Favorable Coastal Waters';
    let marineAction = 'Normal fishing and harbor craft navigation permitted.';
    const marineEvidence: string[] = [];

    if (maxWind > 45 || alerts.some(a => a.hazardType === 'CYCLONE')) {
      marineRisk = 'SEVERE';
      marineHeadline = 'Squally Maritime Gale Warning';
      marineAction = 'Fishermen strictly advised not to venture into deep sea or coastal waters. Total suspension of small-craft operations.';
      marineEvidence.push(`Coastal wind speed: ${maxWind} km/h`);
      marineEvidence.push('Squall line and rough to very rough sea conditions');
    } else if (maxWind > 28) {
      marineRisk = 'ELEVATED';
      marineHeadline = 'Caution in Open Sea';
      marineAction = 'Small fishing boats should exercise caution due to choppy surface swells.';
      marineEvidence.push(`Wind velocity: ${maxWind} km/h`);
    } else {
      marineEvidence.push('Calm to moderate sea state.');
    }

    items.push({
      domain: 'MARINE',
      domainName: 'Marine & Coastal',
      iconName: 'Anchor',
      riskLevel: marineRisk,
      headline: marineHeadline,
      actionableRecommendation: marineAction,
      evidence: marineEvidence
    });
  }

  // Filter if specific domains requested, otherwise return all
  if (requestedDomains && requestedDomains.length > 0) {
    const filtered = items.filter(i => requestedDomains.includes(i.domain));
    if (filtered.length > 0) return filtered;
  }

  return items;
}
