import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/doConnect';
import { ClientT } from '../../../lib/models/client';

export async function GET() {
  await dbConnect();
  const clients = await ClientT.find().sort({ createdAt: -1 });
  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const newClient = await ClientT.create(body);
  return NextResponse.json(newClient, { status: 201 });
}
