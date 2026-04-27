import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const AMAP_ENDPOINT = 'https://restapi.amap.com/v3/weather/weatherInfo';
const DEFAULT_CITY = '110000';

interface AmapLive {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

interface AmapResponse {
  status: string;
  info: string;
  infocode: string;
  lives?: AmapLive[];
}

export async function GET(request: Request) {
  const key = process.env.AMAP_KEY;
  if (!key) {
    return NextResponse.json(
      { error: 'AMAP_KEY is not configured on the server' },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') ?? process.env.AMAP_CITY_CODE ?? DEFAULT_CITY;

  const upstream = new URL(AMAP_ENDPOINT);
  upstream.searchParams.set('key', key);
  upstream.searchParams.set('city', city);
  upstream.searchParams.set('extensions', 'base');
  upstream.searchParams.set('output', 'JSON');

  const res = await fetch(upstream, { next: { revalidate: 1800 } });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Amap upstream error: ${res.status}` },
      { status: 502 },
    );
  }

  const data: AmapResponse = await res.json();

  if (data.status !== '1' || !data.lives?.length) {
    return NextResponse.json(
      { error: data.info || 'Amap returned no live weather' },
      { status: 502 },
    );
  }

  const live = data.lives[0];
  return NextResponse.json({
    city: live.city,
    weather: live.weather,
    temperature: Number(live.temperature),
    windDirection: live.winddirection,
    windPower: live.windpower,
    humidity: Number(live.humidity),
    reportTime: live.reporttime,
  });
}
