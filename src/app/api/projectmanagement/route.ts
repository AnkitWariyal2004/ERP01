import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/doConnect';
import { Project } from '../../../lib/models/project';
// import { NewProject } from '../../../types';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const projectData= await request.json();

    // Basic validation
    if (!projectData.name) {
      return NextResponse.json(
        { success: false, error: 'Project name is required' },
        { status: 400 }
      );
    }

    const startDate = new Date(projectData.startDate);
    const endDate = new Date(projectData.endDate);

    if (endDate < startDate) {
      return NextResponse.json(
        { success: false, error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Convert string dates to Date objects
    const projectToCreate = {
      ...projectData,
      startDate,
      endDate
    };

    // Create project with proper typing
    const project = await Project.create(projectToCreate);

    return NextResponse.json(
      { success: true, data: project },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create project';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}


// app/api/projects/route.ts


export async function GET() {
  try {
    await dbConnect(); // Connect to MongoDB
    
    const projects = await Project.find({})
      .sort({ createdAt: -1 })
      .lean(); // Convert to plain JS objects

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Error fetching projects' },
      { status: 500 }
    );
  }
}