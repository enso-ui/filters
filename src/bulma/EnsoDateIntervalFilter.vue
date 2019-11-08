<template>
    <enso-date-filter alt-input
        :alt-format="format || meta.dateFormat"
        :i18n="i18n"
        :locale="lang"
        v-bind="$attrs"
        v-on="$listeners"/>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import EnsoDateFilter from './EnsoDateFilter.vue';

export default {
    name: 'EnsoDateIntervalFilter',

    components: { EnsoDateFilter },

    inject: ['i18n'],

    props: {
        altFormat: {
            type: String,
            default: null,
        },
    },

    computed: {
        ...mapState(['meta']),
        ...mapGetters('preferences', ['lang']),
    },
};
</script>
