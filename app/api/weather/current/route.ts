import { NextRequest, NextResponse } from 'next/server';
import { orchestrateWeatherData } from '@/lib/weather/orchestrator';
import { findMatchingLocation, POPULAR_INDIAN_LOCATIONS } from '@/lib/weather/locations';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city') || 'Bengaluru';
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    let preferredLoc = findMatchingLocation(city) || POPULAR_INDIAN_LOCATIONS[0];
    if (lat && lng) {
      preferredLoc = {
        name: city,
        country: 'India',
        latitude: parseFloat(lat),
        longitude: parseFloat(lng)
      };
    }

    const data = await orchestrateWeatherData(city, preferredLoc);

    return NextResponse.json({
      success: true,
      data: {
        observation: data.observation,
        provenance: data.provenance,
        confidence: data.confidence,
        alerts: data.alerts
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve current weather observation.', details: err.message },
      { status: 500 }
    );
  }
}
