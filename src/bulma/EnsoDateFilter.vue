<template>
    <date-filter v-bind="$attrs"
        alt-input
        :alt-format="altFormat || meta.dateFormat"
        :i18n="i18n"
        :locale="lang"
        v-on="$listeners"/>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
        ...mapState(['meta']),
        ...mapGetters('preferences', ['lang']),
    },
};
</script>
