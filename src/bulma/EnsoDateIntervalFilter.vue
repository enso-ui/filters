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

    components: { EnsoDateFilter },

    inject: ['i18n'],

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
