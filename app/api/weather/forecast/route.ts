import { NextRequest, NextResponse } from 'next/server';
import { orchestrateWeatherData } from '@/lib/weather/orchestrator';
import { findMatchingLocation, POPULAR_INDIAN_LOCATIONS } from '@/lib/weather/locations';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city') || 'Bengaluru';
    const loc = findMatchingLocation(city) || POPULAR_INDIAN_LOCATIONS[0];

    const data = await orchestrateWeatherData(city, loc);

    return NextResponse.json({
      success: true,
      data: {
        location: data.observation.location,
        hourly: data.hourly,
        daily: data.daily,
        provenance: data.provenance
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve forecast.', details: err.message },
      { status: 500 }
    );
  }
}
