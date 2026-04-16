<template>
    <date-filter alt-input
        :alt-format="altFormat || meta.dateFormat"
        :i18n="i18n"
        :locale="lang"/>
</template>

<script>
import { app as useApp } from '@enso-ui/ui/src/pinia/app';
import { preferences as usePreferences } from '@enso-ui/ui/src/pinia/preferences';
import DateFilter from './DateFilter.vue';

export default {
    name: 'EnsoDateFilter',

    components: { DateFilter },

    inject: ['i18n'],

    props: {
        altFormat: {
            type: String,
            default: null,
        },
    },

    computed: {
        meta() {
            return useApp().meta;
        },
        lang() {
            return usePreferences().lang;
        },
    },
};
</script>
