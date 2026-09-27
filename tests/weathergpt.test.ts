import { parseWeatherQuery } from '../lib/ai/query-parser';
import { orchestrateWeatherData } from '../lib/weather/orchestrator';
import { evaluateDecisionSupport } from '../lib/risk-engine/decision-support';
import { generateGroundedResponse } from '../lib/ai/grounded-reasoner';
import { POPULAR_INDIAN_LOCATIONS } from '../lib/weather/locations';

async function runTestSuite() {
  console.log('🧪 Starting WeatherGPT Comprehensive Automated Verification Suite...\n');
  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, details?: any) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`, details || '');
      process.exitCode = 1;
    }
  }

  // TEST 1: Query Parser & Entity Extraction (Flagship Query)
  console.log('--- Test Suite 1: Query Parser & Intent Disambiguation ---');
  const q1 = 'Will it rain tomorrow in Bengaluru, and is it safe to travel?';
  const intent1 = parseWeatherQuery(q1);
  assert(intent1.location === 'Bengaluru', 'Extracts location = Bengaluru');
  assert(intent1.timeRange === 'tomorrow', 'Extracts timeRange = tomorrow');
  assert(intent1.intents.includes('travel_safety'), 'Identifies intent = travel_safety');
  assert(intent1.primaryDomain === 'TRAVEL', 'Identifies primaryDomain = TRAVEL');
  assert(intent1.isFlagshipScenario === 'BENGALURU_RAIN_TRAVEL', 'Detects BENGALURU_RAIN_TRAVEL flagship scenario');

  // TEST 2: Agricultural Intent
  const q2 = 'Should I spray pesticides tomorrow in Mysuru?';
  const intent2 = parseWeatherQuery(q2);
  assert(intent2.location === 'Mysuru', 'Extracts location = Mysuru');
  assert(intent2.primaryDomain === 'AGRICULTURE', 'Identifies primaryDomain = AGRICULTURE');

  // TEST 3: GIS Map Trigger Intent
  const q3 = 'Show me flood risk around Bengaluru tomorrow.';
  const intent3 = parseWeatherQuery(q3);
  assert(intent3.requiresMap === true, 'Sets requiresMap = true for visual flood inquiry');

  // TEST 4: Weather Orchestration & Normalization
  console.log('\n--- Test Suite 2: Weather Data Orchestrator & Normalization ---');
  const weatherBlr = await orchestrateWeatherData('Bengaluru', POPULAR_INDIAN_LOCATIONS[0], 'BENGALURU_RAIN');
  assert(weatherBlr.observation.location.name === 'Bengaluru', 'Observation location is Bengaluru');
  assert(weatherBlr.hourly.length >= 10, 'Hourly forecasts populated (>10 hours)');
  assert(weatherBlr.alerts.length > 0, 'Alerts populated for Bengaluru scenario');
  assert(weatherBlr.provenance.providerName.length > 0, 'Data provenance contains provider info');
  assert(weatherBlr.confidence.score >= 80, `Model confidence computed accurately (${weatherBlr.confidence.score}%)`);

  // TEST 5: Decision Support Engine
  console.log('\n--- Test Suite 3: Domain Decision Support Rules ---');
  const decisions = evaluateDecisionSupport(
    weatherBlr.observation,
    weatherBlr.hourly,
    weatherBlr.alerts,
    ['TRAVEL']
  );
  assert(decisions.length === 1, 'Returns targeted Travel decision item');
  assert(decisions[0].domain === 'TRAVEL', 'Decision domain is TRAVEL');
  assert(decisions[0].riskLevel === 'HIGH' || decisions[0].riskLevel === 'ELEVATED', `Travel risk level is elevated (${decisions[0].riskLevel})`);
  assert(decisions[0].evidence.length > 0, 'Decision includes meteorological evidence');
  assert(decisions[0].safeWindows !== undefined && decisions[0].safeWindows.length > 0, 'Decision calculates safe travel windows');

  // TEST 6: Grounded AI Response Synthesis
  console.log('\n--- Test Suite 4: Grounded AI Reasoning & Synthesis ---');
  const aiResponse = await generateGroundedResponse({
    intent: intent1,
    observation: weatherBlr.observation,
    hourly: weatherBlr.hourly,
    daily: weatherBlr.daily,
    alerts: weatherBlr.alerts,
    provenance: weatherBlr.provenance,
    confidence: weatherBlr.confidence,
    language: 'en'
  });

  assert(aiResponse.forecastSummary.includes('Bengaluru'), 'Summary mentions target city Bengaluru');
  assert(aiResponse.forecastSummary.includes('afternoon'), 'Summary identifies peak rainfall window');
  assert(aiResponse.followUpSuggestions.length >= 3, 'Follow-up suggestions generated (>=3)');
  assert(aiResponse.confidence.score === 88, 'Confidence score matched calibration');

  // TEST 7: Multilingual Grounded Synthesis (Kannada)
  console.log('\n--- Test Suite 5: Multilingual Grounded Generation ---');
  const knResponse = await generateGroundedResponse({
    intent: intent1,
    observation: weatherBlr.observation,
    hourly: weatherBlr.hourly,
    daily: weatherBlr.daily,
    alerts: weatherBlr.alerts,
    provenance: weatherBlr.provenance,
    confidence: weatherBlr.confidence,
    language: 'kn'
  });
  assert(knResponse.forecastSummary.includes('ಬೆಂಗಳೂರಿನಲ್ಲಿ'), 'Kannada summary contains localized city text');

  // TEST 8: End-to-End Flagship Scenario Execution
  console.log('\n--- Test Suite 6: Flagship SIH Demo End-to-End Test ---');
  console.log(`Prompt: "${q1}"`);
  console.log(`Output Summary:\n${aiResponse.forecastSummary}`);
  console.log(`Travel Action:\n${aiResponse.decisionSupport[0]?.actionableRecommendation}`);
  console.log(`Confidence: ${aiResponse.confidence.score}% (${aiResponse.confidence.label})`);
  console.log(`Sources: ${aiResponse.provenance.providerName} [${aiResponse.provenance.model}]`);
  
  assert(aiResponse.decisionSupport[0]?.headline.length > 0, 'Headline is non-empty');
  assert(aiResponse.hourlyHighlights.length > 0, 'Precipitation timeline populated');

  console.log(`\n========================================`);
  console.log(`🎉 TEST RUN COMPLETED: ${passedTests}/${totalTests} TESTS PASSED`);
  console.log(`========================================\n`);

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Test suite uncaught error:', err);
  process.exit(1);
});
