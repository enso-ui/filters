<template>
    <enso-date-filter :format="format || meta.jsDateFormat"
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

    inject: ['i18n'],

    components: { EnsoDateFilter },

    props: {
        format: {
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
