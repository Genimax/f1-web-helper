import { NextRequest, NextResponse } from 'next/server';
import { f1ApiService } from '@/shared/api/f1ApiService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    const params = {
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    };

    const data = await f1ApiService.getCurrentDriversChampionship(params);

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=86400',
        // Кэшируем на 12 часов, stale-while-revalidate на 24 часа
      },
    });
  } catch (error) {
    console.error('Error fetching drivers championship:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch drivers championship data' },
      { status: 500 }
    );
  }
}
