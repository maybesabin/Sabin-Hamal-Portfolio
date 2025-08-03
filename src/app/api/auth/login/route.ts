import connectToDb from "@/lib/db";
import { handleError } from "@/utils/handleError";
import { errorResponse, successResponse } from "@/utils/response";

export async function POST(req: Request) {
    try {
        await connectToDb()
        const { email, password } = await req.json()

        if (!email || !password) return errorResponse("Please provide all fields")

        if (
            email == process.env.ADMIN_EMAIL &&
            password == process.env.ADMIN_PASSWORD
        ) {
            return successResponse("Successfully logged in")
        } else {
            return errorResponse("Invalid credentials")
        }
    } catch (error) {
        return handleError(error)
    }
}