<template>
    <div class="vue-filter is-paddingless">
        <div v-if="!compact"
            class="header has-text-centered has-background-light">
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

<style lang="scss">
    .vue-filter {
        .header {
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
            padding-top: 0.5em;
        }

        .select-wrapper {
            padding: 0.25em;
        }
    }
</style>
