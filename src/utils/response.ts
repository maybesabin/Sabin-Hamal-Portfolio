import { NextResponse } from "next/server"

export const errorResponse = (message: string, status: number = 500) => {
    return NextResponse.json({ message, status }, { status })
}

export const successResponse = (message: string, status: number = 200) => {
    return NextResponse.json({ message, status }, { status })
}