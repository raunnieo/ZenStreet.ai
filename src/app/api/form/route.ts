import { NextRequest, NextResponse } from 'next/server';

interface FieldUpdate {
  value: any;
  timestamp: number;
  clientId: string;
}

interface SessionData {
  data: Record<string, FieldUpdate>;
  lastModified: number;
  activeClients: Set<string>;
}

const sessions: Record<string, SessionData> = {};

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');

  if (action === 'join') {
    const { sessionId, clientId } = await request.json();
    
    if (!sessions[sessionId]) {
      sessions[sessionId] = {
        data: {},
        lastModified: Date.now(),
        activeClients: new Set([clientId])
      };
    } else {
      sessions[sessionId].activeClients.add(clientId);
    }

    return NextResponse.json({
      data: sessions[sessionId].data,
      activeClients: sessions[sessionId].activeClients.size
    });
  }

  if (action === 'leave') {
    const { sessionId, clientId } = await request.json();
    
    if (sessions[sessionId]) {
      sessions[sessionId].activeClients.delete(clientId);
      if (sessions[sessionId].activeClients.size === 0) {
        delete sessions[sessionId];
      }
    }
    return NextResponse.json({ success: true });
  }

  // Handle form state updates
  const { sessionId, formData, clientId } = await request.json();
  if (!sessions[sessionId]) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  const timestamp = Date.now();
  const session = sessions[sessionId];

  // Update only changed fields
  Object.entries(formData).forEach(([field, value]) => {
    session.data[field] = {
      value,
      timestamp,
      clientId
    };
  });

  session.lastModified = timestamp;

  return NextResponse.json({
    timestamp: session.lastModified,
    activeClients: session.activeClients.size
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('sessionId');
  const lastSync = parseInt(searchParams.get('lastSync') || '0');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  }

  const session = sessions[sessionId];
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  const modified = session.lastModified > lastSync;
  return NextResponse.json({
    modified,
    data: modified ? session.data : null,
    lastModified: session.lastModified,
    activeClients: session.activeClients.size
  });
}
