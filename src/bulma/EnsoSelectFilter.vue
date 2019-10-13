<template>
    <core-select-filter :compact="compact"
        :i18n="i18n"
        :label="label">
        <enso-select v-tooltip="compact ? i18n(label) : null"
            class="select-wrapper"
            :class="{'has-background-light': compact}"
            v-bind="$attrs"
            v-on="$listeners"
            ref="select"/>
    </core-select-filter>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { EnsoSelect } from '@enso-ui/select/bulma';
import CoreSelectFilter from './CoreSelectFilter.vue';

export default {
    name: 'EnsoSelectFilter',

    directives: { tooltip: VTooltip },

    components: { CoreSelectFilter, EnsoSelect },

    inject: ['i18n'],

    props: {
        compact: {
            type: Boolean,
            default: false,
        },
        label: {
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
