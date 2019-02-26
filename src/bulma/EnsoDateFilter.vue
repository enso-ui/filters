<template>
    <date-filter :format="format || meta.jsDateFormat"
        :i18n="__"
        :locale="lang"
        v-bind="$attrs"
        v-on="$listeners"/>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import DateFilter from './DateFilter.vue';

export default {
    components: { DateFilter },

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
