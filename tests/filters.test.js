import { describe, expect, it, vi } from 'vitest';

vi.mock('@enso-ui/ui/src/pinia/app', () => ({
    app: () => ({
        meta: {
            dateFormat: 'd.m.Y',
        },
    }),
}));

vi.mock('@enso-ui/ui/src/pinia/preferences', () => ({
    preferences: () => ({
        lang: 'ro',
    }),
}));

import EnsoDateFilter from '../src/bulma/EnsoDateFilter.vue';

describe('EnsoDateFilter', () => {
    it('derives date format directly from app store meta', () => {
        const format = EnsoDateFilter.computed.format.call({
            altFormat: null,
        });

        expect(format).toBe('d.m.Y');
    });
});
