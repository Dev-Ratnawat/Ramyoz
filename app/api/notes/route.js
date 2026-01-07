import  connectDB  from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

/* ===================== GET NOTES ===================== */
export async function GET() {
  try {
    await connectDB();
    const notes = await Note.find().sort({ createdAt: -1 });

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("GET Notes Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

/* ===================== CREATE NOTE ===================== */
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Basic validation
    if (!body.title || !body.content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const note = await Note.create({
      title: body.title,
      content: body.content,
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Create Note Error:", error);
    return NextResponse.json(
      { message: "Failed to create note" },
      { status: 500 }
    );
  }
}
