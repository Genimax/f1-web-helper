import { NextRequest, NextResponse } from "next/server";
import { f1ApiService } from "@/shared/api/f1ApiService";

export async function GET(request: NextRequest) {
    try {
        const data = await f1ApiService.getNextRace();

        return NextResponse.json(data, {
            headers: {
                "Cache-Control":
                    "public, s-maxage=3600, stale-while-revalidate=7200",
                // Кэшируем на 1 час, stale-while-revalidate на 2 часа
                // Информация о следующем уикенде может изменяться чаще чем чемпионат
            },
        });
    } catch (error) {
        console.error("Error fetching next race data:", error);

        return NextResponse.json(
            { error: "Failed to fetch next race data" },
            { status: 500 }
        );
    }
}
