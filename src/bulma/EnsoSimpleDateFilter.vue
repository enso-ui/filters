<template>
    <simple-date-filter alt-input
        :alt-format="altFormat || meta.dateFormat"
        :i18n="i18n"
        :locale="lang"
        v-bind="$attrs"
        v-on="$listeners"/>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SimpleDateFilter from './SimpleDateFilter.vue';

export default {
    name: 'EnsoSimpleDateFilter',

    components: { SimpleDateFilter },

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
