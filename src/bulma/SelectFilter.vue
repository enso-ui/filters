<template>
    <base-select-filter :class="$attrs.class"
        :compact="compact"
        :i18n="i18n"
        :readonly="readonly"
        :name="name">
        <template #default="{ readonly }">
            <vue-select v-bind="{...$attrs, class: 'filter-wrapper'}"
                :i18n="i18n"
                :readonly
                v-tooltip="compact ? i18n(name) : null"
                ref="select"/>
        </template>
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

    inheritAttrs: false,

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
