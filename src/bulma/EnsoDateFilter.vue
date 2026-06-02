<template>
    <date-filter alt-input
        :alt-format="format"
        :i18n="i18n"
        :locale="lang"/>
</template>

<script>
import { app } from '@enso-ui/ui/src/pinia/app';
import { preferences } from '@enso-ui/ui/src/pinia/preferences';
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
        lang() {
            return preferences().lang;
        },
        format() {
            return this.altFormat || app().meta.dateFormat;
        },
    },
};
</script>
