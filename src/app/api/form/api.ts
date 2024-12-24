export const joinSession = async (sessionId: string, clientId: string) => {
  try {
    const response = await fetch(`/api/form?action=join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, clientId }),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to join session:', error);
    return null;
  }
};

export const leaveSession = async (sessionId: string, clientId: string) => {
  try {
    await fetch(`/api/form?action=leave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, clientId }),
    });
  } catch (error) {
    console.error('Failed to leave session:', error);
  }
};

export const updateFormState = async (sessionId: string, formData: any, clientId: string) => {
  try {
    const response = await fetch('/api/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, formData, clientId }),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to update form state:', error);
    return null;
  }
};

export const checkForUpdates = async (sessionId: string, lastSync: number, clientId: string) => {
  try {
    const response = await fetch(`/api/form?sessionId=${sessionId}&lastSync=${lastSync}&clientId=${clientId}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to check for updates:', error);
    return null;
  }
};
