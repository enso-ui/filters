<template>
    <core-date-interval-filter v-bind="$attrs"
        v-on="$listeners">
        <template v-slot:default="{ minBindings, minEvents, maxBindings, maxEvents }">
            <div class="date-interval-filter is-paddingless">
                <div class="header has-background-light has-text-centered"
                    v-if="!compact">
                    <strong>
                        {{ i18n(title) }}
                    </strong>
                </div>
                <div v-tooltip="compact ? i18n(title) : null"
                    class="dates-wrapper"
                    :class="{ 'has-background-light': compact }">
                    <div class="columns is-mobile is-variable is-1 is-centered">
                        <div class="column">
                            <datepicker :placeholder="i18n(minLabel)"
                                v-bind="minBindings"
                                v-on="minEvents"/>
                        </div>
                        <div class="column">
                            <datepicker :placeholder="i18n(maxLabel)"
                                v-bind="maxBindings"
                                v-on="maxEvents"/>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </core-date-interval-filter>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { Datepicker } from '@enso-ui/datepicker/bulma';
import CoreDateIntervalFilter from '../renderless/CoreDateIntervalFilter.vue';

export default {
    name: 'DateIntervalFilter',

    directives: { tooltip: VTooltip },

    components: { CoreDateIntervalFilter, Datepicker },

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
            default: 'To',
        },
        minLabel: {
            type: String,
            default: 'From',
        },
        title: {
            type: String,
            default: null,
        },
    },

    data: () => ({
        interval: {
            min: null,
            max: null,
        },
    }),
};
</script>

<style lang="scss">
    .date-interval-filter {
        .header {
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
            padding-top: 0.5em;
        }

        .dates-wrapper {
            border-radius: inherit;
            padding: 0.25em;
        }
    }
</style>
