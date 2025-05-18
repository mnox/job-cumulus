import type { WritableDraft } from 'immer';

export interface CacheProtectedState {
  lastFetched: {
    collection: number | null;
    individual: {
      [id: number]: number;
    }
  };
  cacheMinutes: {
    collection: number;
    individual: number;
  };
}

export const withCacheDefaults = (state: any) => {
  return {
    ...state,
    lastFetched: {
      collection: null,
      individual: {},
    },
    cacheMinutes: {
      collection: 5,
      individual: 5,
    },
  }
}

export const cacheValid = (lastFetched: number | null, windowMinutes: number) => {
  const now = Date.now();
  return lastFetched && ((now - lastFetched) / 6000) < windowMinutes * 60 * 1000
}

export const cacheReducerMethods = {
  invalidateCollectionCache(state: WritableDraft<CacheProtectedState>) {
    state.lastFetched.collection = null;
  },
  invalidateIndividualCache(state: WritableDraft<any>) {
    state.lastFetched.collection = null;
  },
}