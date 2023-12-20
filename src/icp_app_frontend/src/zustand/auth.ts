import { Identity } from '@dfinity/agent';
import { create } from 'zustand'

export interface AuthStoreData {
    identity: Identity | undefined | null;
    setIdentity: (identity: Identity | undefined | null) => void;
}

export const useAuthStore = create<AuthStoreData>((set) => ({
    identity: null,
    setIdentity: (authentication: Identity | undefined | null) => set(() => ({ identity: authentication })),
}));

export default useAuthStore;