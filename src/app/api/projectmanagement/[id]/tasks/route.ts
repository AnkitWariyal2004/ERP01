import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/doConnect";
import { Project } from "../../../../../lib/models/project";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }  // ✅ Promise type
) {
  try {
    await dbConnect();
    const { id } = await context.params;  // ✅ Await it here
    const body = await request.json();

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $push: { tasks: body } },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      {
        message: "Error creating task",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
