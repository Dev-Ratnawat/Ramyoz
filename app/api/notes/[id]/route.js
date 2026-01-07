import  connectDB  from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

/* ===================== UPDATE NOTE ===================== */
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const body = await req.json();
    const { id } = params;

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { message: "Update data is required" },
        { status: 400 }
      );
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedNote, { status: 200 });

  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { message: "Failed to update note" },
      { status: 500 }
    );
  }
}

/* ===================== DELETE NOTE ===================== */
export async function DELETE(req, { params }) {
  await connectDB();

  const { id } = await params;

  const deletedNote = await Note.findByIdAndDelete(id);

  if (!deletedNote) {
    return NextResponse.json(
      { message: "Note not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Note deleted successfully" },
    { status: 200 }
  );
}
