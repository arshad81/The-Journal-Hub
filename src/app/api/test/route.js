import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
// Handle GET request
export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "GET request successful!" });
  } catch (error) {
    return NextResponse.json({ error: "Database connection failed"+error }, { status: 500 });
  }
}

// Handle POST request
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json(); // Extract data from request body
    return NextResponse.json({ message: "POST request successful!", data });
  } catch (error) {
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}
