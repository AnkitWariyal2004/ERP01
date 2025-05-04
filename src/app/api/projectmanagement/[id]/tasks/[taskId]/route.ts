import { NextResponse } from "next/server";
import dbConnect from "../../../../../../lib/doConnect";
import { Project } from "../../../../../../lib/models/project";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string; taskId: string }> }
) {
  try {
    await dbConnect();
    const { id, taskId } = await context.params;  // ✅ Await params

    const body = await request.json();
    
    const updatedProject = await Project.findOneAndUpdate(
      { 
        _id: id,
        "tasks._id": taskId
      },
      { 
        $set: {
          "tasks.$.title": body.title,
          "tasks.$.description": body.description,
          "tasks.$.type": body.type,
          "tasks.$.status": body.status,
          "tasks.$.priority": body.priority,
          "tasks.$.dueDate": body.dueDate,
          "tasks.$.assignee": body.assignee
        } 
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project or task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Error updating task", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
