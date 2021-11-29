<template>
    <base-select-filter :compact="compact"
        :i18n="i18n"
        :name="name">
        <enso-select v-bind="{...$attrs, class: 'select-wrapper'}"
            :class="{'has-background-light': compact}"
            v-tooltip="compact ? i18n(name) : null"
            ref="select"/>
    </base-select-filter>
</template>

<script>
import 'v-tooltip/dist/v-tooltip.css';
import { VTooltip } from 'v-tooltip';
import { EnsoSelect } from '@enso-ui/select/bulma';
import BaseSelectFilter from './BaseSelectFilter.vue';

export default {
    name: 'EnsoSelectFilter',

    directives: { tooltip: VTooltip },

    components: { BaseSelectFilter, EnsoSelect },

    inject: ['i18n'],

    props: {
        compact: {
            type: Boolean,
            default: false,
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
