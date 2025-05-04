import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/doConnect';
import { Project, PopulatedProject } from '../../../../lib/models/project';
import '../../../../lib/models/client'; // side effect only
import { Types } from 'mongoose';

type ProjectWithClientName = Omit<PopulatedProject, 'clientID'> & {
  clientID: { _id: Types.ObjectId; name: string };
};

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }  // ✅ mark as Promise
) {
  try {
    const { id } = await context.params;  // ✅ await here
    await dbConnect();

    const project = await Project.findById(id)
      .populate('clientID', 'name')
      .lean()
      .select('-__v') as ProjectWithClientName;

    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      {
        message: 'Error fetching project',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
