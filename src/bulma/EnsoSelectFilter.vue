<template>
    <core-select-filter :compact="compact"
        :i18n="i18n"
        :title="title">
        <enso-select v-tooltip="compact ? i18n(title) : null"
            class="select-wrapper"
            :class="{'has-background-light': compact}"
            :title="title"
            v-bind="$attrs"
            v-on="$listeners"/>
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
        title: {
            type: String,
            default: null,
        },
    },
};

</script>
