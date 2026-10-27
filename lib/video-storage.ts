// IndexedDB & Client Host Storage helper for video files

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
 * Uploads video file directly to the host /public_html/uploads/ directory using /upload.php endpoint.
 * Returns the public URL (/uploads/filename.mp4) or null if upload fails.
 */
export async function uploadVideoToServerHost(file: File): Promise<string | null> {
  // 1. Try PHP uploader script on static host (public_html/upload.php -> /uploads/)
  try {
    const formData = new FormData();
    formData.append('file', file);

    const phpUploaderUrl = '/upload.php';
    const phpRes = await fetch(phpUploaderUrl, {
      method: 'POST',
      body: formData,
    });

    if (phpRes.ok) {
      const data = await phpRes.json();
      if (data.success && data.url) {
        return data.url; // e.g. /uploads/1740000000_video.mp4
      }
    }
  } catch (phpErr) {
    console.warn('PHP upload.php endpoint not available, trying backend fallback:', phpErr);
  }

  // 2. Fallback to API endpoint if not on HTTPS or if custom API endpoint is configured
  try {
    if (typeof window !== 'undefined' && window.location.protocol === 'https:' && !process.env.NEXT_PUBLIC_API_URL?.startsWith('https:')) {
      return null;
    }

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
