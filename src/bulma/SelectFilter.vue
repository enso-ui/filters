<template>
    <core-select-filter :compact="compact"
        :i18n="i18n"
        :title="title">
        <vue-select v-tooltip="compact ? i18n(title) : null"
            class="select-wrapper"
            :class="{'has-background-light': compact}"
            :i18n="i18n"
            :title="title"
            v-bind="$attrs"
            v-on="$listeners"
            ref="select"/>
    </core-select-filter>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { VueSelect } from '@enso-ui/select/bulma';
import CoreSelectFilter from './CoreSelectFilter.vue';

export default {
    name: 'SelectFilter',

    directives: { tooltip: VTooltip },

    components: { CoreSelectFilter, VueSelect },

    props: {
        compact: {
            type: Boolean,
            default: false,
        },
        i18n: {
            type: Function,
            default: v => v,
        },
        title: {
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
