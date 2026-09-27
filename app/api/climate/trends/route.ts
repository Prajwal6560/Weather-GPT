import { NextRequest, NextResponse } from 'next/server';
import { getHistoricalClimateComparison } from '@/lib/weather/providers/simulation';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city') || 'Bengaluru';

    const climateData = getHistoricalClimateComparison(city);

    return NextResponse.json({
      success: true,
      data: climateData
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve climate trends.', details: err.message },
      { status: 500 }
    );
  }
}
