import { NextRequest, NextResponse } from 'next/server';
import { getBengaluruRainScenario, getChennaiCycloneScenario, getMysuruFarmerScenario } from '@/lib/weather/providers/simulation';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');

    const blr = getBengaluruRainScenario().alerts;
    const chn = getChennaiCycloneScenario().alerts;
    const mys = getMysuruFarmerScenario().alerts;

    let allAlerts = [...chn, ...blr, ...mys];

    if (city) {
      const norm = city.toLowerCase();
      allAlerts = allAlerts.filter(a => 
        a.affectedDistricts.some(d => d.toLowerCase().includes(norm)) ||
        a.title.toLowerCase().includes(norm)
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        totalAlerts: allAlerts.length,
        alerts: allAlerts,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve early warning alerts.', details: err.message },
      { status: 500 }
    );
  }
}
