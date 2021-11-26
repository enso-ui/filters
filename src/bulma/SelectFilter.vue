<template>
    <base-select-filter :compact="compact"
        :i18n="i18n"
        :name="name">
        <vue-select v-tooltip="compact ? i18n(name) : null"
            class="select-wrapper"
            :class="{'has-background-light': compact}"
            v-bind="$attrs"
            :i18n="i18n"
            ref="select"/>
    </base-select-filter>
</template>

<script>
import 'v-tooltip/dist/v-tooltip.css';
import { VTooltip } from 'v-tooltip';
import { VueSelect } from '@enso-ui/select/bulma';
import BaseSelectFilter from './BaseSelectFilter.vue';

export default {
    name: 'SelectFilter',

    directives: { tooltip: VTooltip },

    components: { BaseSelectFilter, VueSelect },

    props: {
        compact: {
            type: Boolean,
            default: false,
        },
        i18n: {
            type: Function,
            default: v => v,
        },
        name: {
            type: String,
            default: null,
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
