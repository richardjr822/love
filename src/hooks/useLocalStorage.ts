// useLocalStorage.ts - Typed localStorage hook backed by useSyncExternalStore snapshots
'use client';

import { useCallback, useSyncExternalStore } from 'react';

const LOCAL_STORAGE_EVENT = 'local-storage-update';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [initialValue, key]);

  const subscribe = useCallback((onStoreChange: () => void) => {
    if (typeof window === 'undefined') {
      return () => {};
    }

    const handler = (event: Event) => {
      if (event instanceof StorageEvent) {
        if (event.key !== key) return;
      }

      onStoreChange();
    };

    window.addEventListener('storage', handler);
    window.addEventListener(LOCAL_STORAGE_EVENT, handler);

    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener(LOCAL_STORAGE_EVENT, handler);
    };
  }, [key]);

  const storedValue = useSyncExternalStore(subscribe, readValue, () => initialValue);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const previous = readValue();
        const valueToStore = value instanceof Function ? value(previous) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT));
      } catch {
        return;
      }
    },
    [key, readValue]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT));
    } catch {
      return;
    }
  }, [key]);

  return [storedValue, setValue, removeValue];
}
