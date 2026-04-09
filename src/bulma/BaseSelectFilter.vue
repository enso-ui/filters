<template>
    <div class="vue-filter p-0">
        <div v-if="!compact"
            class="header filter-header has-text-centered px-2">
            <b>{{ i18n(name) }}</b>
        </div>
        <slot/>
    </div>
</template>

<script>
import 'v-tooltip/dist/v-tooltip.css';
import { VTooltip } from 'v-tooltip';

export default {
    name: 'BaseSelectFilter',

    directives: { tooltip: VTooltip },

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
};

</script>
