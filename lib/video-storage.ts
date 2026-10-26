// IndexedDB & Server Host upload helper for video files

const DB_NAME = 'negar_abtab_video_db';
const STORE_NAME = 'video_files';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

import { getApiUrl } from './api-config';

/**
 * Uploads video file to the server API route (/api/upload) so it persists on the backend (141.11.32.127).
 * Returns the server URL (/api/videos/[filename] or full URL) or null if server fails.
 */
export async function uploadVideoToServerHost(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const uploadEndpoint = getApiUrl('/api/upload');
    const res = await fetch(uploadEndpoint, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.url) {
        // Return full URL if uploaded to remote server
        if (data.url.startsWith('http://') || data.url.startsWith('https://')) {
          return data.url;
        }
        return getApiUrl(data.url);
      }
    }
  } catch (error) {
    console.warn('Host upload endpoint warning (using client fallback):', error);
  }
  return null;
}

export async function saveVideoFile(id: string, file: Blob): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(file, id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Failed to save video to IndexedDB:', error);
  }
}

export async function getVideoBlob(id: string): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result || null);
      };
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function deleteVideoFile(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Failed to delete video from IndexedDB:', error);
  }
}
