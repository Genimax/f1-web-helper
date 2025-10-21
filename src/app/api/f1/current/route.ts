import { NextRequest, NextResponse } from "next/server";
import { f1ApiService } from "@/shared/api/f1ApiService";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get("limit");
        const offset = searchParams.get("offset");

        const params = {
            ...(limit && { limit: parseInt(limit) }),
            ...(offset && { offset: parseInt(offset) }),
        };

        const data = await f1ApiService.getCurrentSchedule(params);

        return NextResponse.json(data, {
            headers: {
                "Cache-Control":
                    "public, s-maxage=1800, stale-while-revalidate=3600",
                // Кэшируем на 30 минут, stale-while-revalidate на 1 час
                // Расписание может изменяться, но не так часто
            },
        });
    } catch (error) {
        console.error("Error fetching current schedule data:", error);

        return NextResponse.json(
            { error: "Failed to fetch current schedule data" },
            { status: 500 }
        );
    }
}
