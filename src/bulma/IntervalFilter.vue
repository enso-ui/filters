<template>
    <div class="interval-filter is-paddingless"
        :class="$attrs.class">
        <div v-if="!compact"
            class="header has-text-centered has-background-light px-2">
            <b>{{ i18n(name) }}</b>
        </div>
        <div v-tooltip="compact ? i18n(name) : null"
            :class="['input-wrapper', {'has-background-light': compact}]">
            <core-interval-filter v-bind="$attrs">
                <template #default="{
                        modelValue, invalid, minBindings, minEvents, maxBindings,
                        maxEvents, minClearEvents, maxClearEvents,
                    }">
                    <div class="columns is-mobile">
                        <div class="column">
                            <div class="control has-icons-right">
                                <input class="input control"
                                    :class="[{ 'is-danger': invalid }]"
                                    v-bind="minBindings"
                                    :placeholder="i18n(minLabel)"
                                    v-on="minEvents">
                                <span v-if="modelValue.min"
                                    class="icon is-small is-right clear-button"
                                    v-on="minClearEvents">
                                    <a class="delete is-small"/>
                                </span>
                            </div>
                        </div>
                        <div class="column">
                            <div class="control has-icons-right">
                                <input class="input control"
                                    :class="[{ 'is-danger': invalid }]"
                                    v-bind="maxBindings"
                                    :placeholder="i18n(maxLabel)"
                                    v-on="maxEvents">
                                <span v-if="modelValue.max"
                                    class="icon is-small is-right clear-button"
                                    v-on="maxClearEvents">
                                    <a class="delete is-small"/>
                                </span>
                            </div>
                        </div>
                    </div>
                </template>
            </core-interval-filter>
        </div>
    </div>
</template>

<script>
import 'v-tooltip/dist/v-tooltip.css';
import { VTooltip } from 'v-tooltip';
import CoreIntervalFilter from '../renderless/CoreIntervalFilter.vue';

export default {
    name: 'IntervalFilter',

    directives: { tooltip: VTooltip },

    components: { CoreIntervalFilter },

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
        maxLabel: {
            type: String,
            default: 'Max',
        },
        minLabel: {
            type: String,
            default: 'Min',
        },
        name: {
            type: String,
            default: null,
        },
    },
};
</script>

<style lang="scss">
    .interval-filter {
        .header {
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
            padding-top: 0.5em;
        }

        .input-wrapper {
            border-radius: inherit;
            padding: 0.25em;
        }

        .control.has-icons-right .icon.clear-button {
            pointer-events: all;
        }
    }
</style>
