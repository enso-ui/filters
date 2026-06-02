<template>
    <base-select-filter :class="$attrs.class"
        :compact="compact"
        :i18n="i18n"
        :readonly="readonly"
        :name="name">
        <enso-select class="p-0"
            v-bind="$attrs"
            :readonly="readonly"
            ref="select"/>
    </base-select-filter>
</template>

<script>
import { EnsoSelect } from '@enso-ui/select/bulma';
import BaseSelectFilter from './BaseSelectFilter.vue';

export default {
    name: 'EnsoSelectFilter',

    components: { BaseSelectFilter, EnsoSelect },

    inject: ['i18n'],

    inheritAttrs: false,

    props: {
        compact: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            default: null,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        clear() {
            this.$refs.select.clear();
        },
        fetch() {
            this.$refs.select.fetch();
        },
    },
};
</script>
