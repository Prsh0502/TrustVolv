const API_BASE = process.env.REACT_APP_EVENTS_API || 'http://localhost:4000';
const STORAGE_KEY = 'servesphere-events';

const saveLocal = (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const loadLocal = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
};

const fetchWithTimeout = async (url, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } finally {
        clearTimeout(timeoutId);
    }
};

export const getEvents = async () => {
    try {
        const events = await fetchWithTimeout(`${API_BASE}/events`);
        saveLocal(events);
        return events;
    } catch (err) {
        console.warn('API load failed, using local fallback', err);
        return loadLocal();
    }
};

export const addEvent = async (newEvent) => {
    try {
        const saved = await fetchWithTimeout(`${API_BASE}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent),
        });
        const local = loadLocal();
        const merged = [saved, ...local];
        saveLocal(merged);
        return saved;
    } catch {
        const local = loadLocal();
        const fallback = { ...newEvent };
        const merged = [fallback, ...local];
        saveLocal(merged);
        return fallback;
    }
};

export const joinEvent = async (eventId) => {
    try {
        const event = await fetchWithTimeout(`${API_BASE}/events/${eventId}/join`, { method: 'POST' });
        const local = loadLocal().map((e) => (e.id === eventId ? event : e));
        saveLocal(local);
        return event;
    } catch {
        const local = loadLocal().map((e) =>
            e.id === eventId ? { ...e, volunteers: (e.volunteers || 0) + 1 } : e
        );
        saveLocal(local);
        return local.find((e) => e.id === eventId);
    }
};
