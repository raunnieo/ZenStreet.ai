type SessionData = {
  formData: any;
  lastModified: number;
  connectedClients: Set<string>;
};

class ActiveSessions {
  private static instance: ActiveSessions;
  private sessions: Map<string, SessionData>;

  private constructor() {
    this.sessions = new Map();
  }

  public static getInstance(): ActiveSessions {
    if (!ActiveSessions.instance) {
      ActiveSessions.instance = new ActiveSessions();
    }
    return ActiveSessions.instance;
  }

  public joinSession(sessionId: string, clientId: string): SessionData | null {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.connectedClients.add(clientId);
      return session;
    }
    return null;
  }

  public createSession(sessionId: string, clientId: string, initialData = {}): SessionData {
    const newSession = {
      formData: initialData,
      lastModified: Date.now(),
      connectedClients: new Set([clientId])
    };
    this.sessions.set(sessionId, newSession);
    return newSession;
  }

  public updateSession(sessionId: string, formData: any): boolean {
    const session = this.sessions.get(sessionId);
    if (session && session.connectedClients.size > 0) {
      // Merge new data with existing data
      session.formData = {
        ...session.formData,
        ...formData
      };
      session.lastModified = Date.now();
      return true;
    }
    return false;
  }

  public leaveSession(sessionId: string, clientId: string) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.connectedClients.delete(clientId);
      if (session.connectedClients.size === 0) {
        this.sessions.delete(sessionId);
      }
    }
  }

  public getSessionData(sessionId: string): SessionData | null {
    return this.sessions.get(sessionId) || null;
  }
}

export const activeSessions = ActiveSessions.getInstance();
