import { getActivePinia } from 'pinia';

export const useStore = id => {
    const store = getActivePinia()?._s?.get(id);

    if (!store) {
        throw new Error(`Missing Pinia store: ${id}`);
    }

    return store;
};
