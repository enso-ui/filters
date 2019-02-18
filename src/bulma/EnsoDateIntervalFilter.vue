<template>
    <enso-date-filter :format="format || meta.jsDateFormat"
        :i18n="__"
        :locale="lang"
        v-bind="$attrs"
        v-on="$listeners"/>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import EnsoDateFilter from './EnsoDateFilter.vue';

export default {
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
        title() {
            return this.custom
                ? this.i18n('Between')
                : this.i18n('When');
        },
    },
};

</script>
