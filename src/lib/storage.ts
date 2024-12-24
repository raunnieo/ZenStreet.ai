type FormData = { [key: string]: any };

// Use Node.js global as a persistent store
declare global {
  var __formSessions: {
    data: { [sessionId: string]: FormData };
    timestamps: { [sessionId: string]: number };
  };
}

// Initialize global store
if (!global.__formSessions) {
  global.__formSessions = {
    data: {},
    timestamps: {}
  };
}

class FormStorage {
  private static instance: FormStorage;

  private constructor() {
    // Load any existing data from localStorage on client
    if (typeof window !== 'undefined') {
      try {
        const savedSessions = localStorage.getItem('formSessions');
        if (savedSessions) {
          const { data, timestamps } = JSON.parse(savedSessions);
          global.__formSessions.data = { ...global.__formSessions.data, ...data };
          global.__formSessions.timestamps = { ...global.__formSessions.timestamps, ...timestamps };
        }
      } catch (error) {
        console.error('Failed to load from localStorage:', error);
      }
    }
  }

  public static getInstance(): FormStorage {
    if (!FormStorage.instance) {
      FormStorage.instance = new FormStorage();
    }
    return FormStorage.instance;
  }

  private persistToLocalStorage() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('formSessions', JSON.stringify(global.__formSessions));
      } catch (error) {
        console.error('Failed to persist to localStorage:', error);
      }
    }
  }

  public setFormData(sessionId: string, data: FormData) {
    console.log('Setting data for session:', sessionId, data);
    global.__formSessions.data[sessionId] = data;
    global.__formSessions.timestamps[sessionId] = Date.now();
    this.persistToLocalStorage();

    return {
      success: true,
      timestamp: global.__formSessions.timestamps[sessionId],
      data: global.__formSessions.data[sessionId]
    };
  }

  public getFormData(sessionId: string) {
    console.log('Getting data for session:', sessionId, {
      exists: !!global.__formSessions.data[sessionId],
      sessions: Object.keys(global.__formSessions.data)
    });

    return {
      data: global.__formSessions.data[sessionId] || {},
      lastModified: global.__formSessions.timestamps[sessionId] || null,
      exists: !!global.__formSessions.data[sessionId]
    };
  }

  public getAllSessions(): string[] {
    return Object.keys(global.__formSessions.data);
  }

  public getDebugState() {
    return {
      sessions: Object.keys(global.__formSessions.data),
      data: global.__formSessions.data,
      timestamps: global.__formSessions.timestamps
    };
  }
}

export const storage = FormStorage.getInstance();
