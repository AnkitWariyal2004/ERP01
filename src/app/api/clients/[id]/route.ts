import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/doConnect';
import { ClientT } from '../../../../lib/models/client';

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await context.params;  // ✅ await here
  const body = await req.json();
  const updatedClient = await ClientT.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updatedClient);
}

export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await context.params;  // ✅ await here
  await ClientT.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Client deleted' });
}
