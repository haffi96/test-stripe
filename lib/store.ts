import { createContext } from 'react';
import { create } from 'zustand'


export interface AppState {
    customerId: string,
    subscriptionId: string,
    subscriptionItemId: string,
    createSubClientSecret: string,
    updateSubClientSecret: string,
}

export const useStore = create<AppState>(() => ({
    customerId: '',
    subscriptionId: '',
    subscriptionItemId: '',
    createSubClientSecret: '',
    updateSubClientSecret: '',
}))

export const StoreContext = createContext<AppState>({
    customerId: '',
    subscriptionId: '',
    subscriptionItemId: '',
    createSubClientSecret: '',
    updateSubClientSecret: '',
});