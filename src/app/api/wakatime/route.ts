import connectToDb from "@/lib/db";
import { handleError } from "@/utils/handleError";
import { NextResponse } from "next/server";

// ✅ Get today's date in YYYY-MM-DD format
const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
};

export async function GET() {
    try {
        await connectToDb();

        const today = getTodayDate();

        // Encode API key for Basic Auth
        const encodedKey = Buffer.from(`${process.env.WAKATIME_API_KEY}:`).toString("base64");

        const res = await fetch(
            `https://wakatime.com/api/v1/users/current/summaries?start=${today}&end=${today}`,
            {
                headers: {
                    Authorization: `Basic ${encodedKey}`,
                },
            }
        );

        if (!res.ok) {
            throw new Error(`WakaTime API error: ${res.statusText}`);
        }

        const data = await res.json();

        return NextResponse.json({
            message: "WakaTime time fetched successfully",
            data,
        });
    } catch (error) {
        return handleError(error);
    }
}
