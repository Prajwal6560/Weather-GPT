import { NextRequest, NextResponse } from 'next/server';
import { parseWeatherQuery } from '@/lib/ai/query-parser';
import { orchestrateWeatherData } from '@/lib/weather/orchestrator';
import { generateGroundedResponse } from '@/lib/ai/grounded-reasoner';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, currentLocation, language = 'en', forceScenario } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'A valid text query is required.' },
        { status: 400 }
      );
    }

    // 1. Query Understanding & Entity Extraction
    const intent = parseWeatherQuery(query, currentLocation);

    // 2. Weather Data Orchestration (Live vs Deterministic Scenario)
    const weatherData = await orchestrateWeatherData(
      intent.location,
      intent.extractedLocation || currentLocation,
      forceScenario || (intent.isFlagshipScenario === 'BENGALURU_RAIN_TRAVEL' ? 'BENGALURU_RAIN' : 
                         intent.isFlagshipScenario === 'MYSURU_FARMER' ? 'MYSURU_FARMER' : 
                         intent.isFlagshipScenario === 'CHENNAI_CYCLONE' ? 'CHENNAI_CYCLONE' : undefined)
    );

    // 3. Grounded AI Reasoning & Decision Support Synthesis
    const structuredResponse = await generateGroundedResponse({
      intent,
      observation: weatherData.observation,
      hourly: weatherData.hourly,
      daily: weatherData.daily,
      alerts: weatherData.alerts,
      provenance: weatherData.provenance,
      confidence: weatherData.confidence,
      language
    });

    return NextResponse.json({
      success: true,
      data: structuredResponse
    });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return NextResponse.json(
      { error: 'Meteorological reasoning service encountered an error.', details: err.message },
      { status: 500 }
    );
  }
}
