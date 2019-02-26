<template>
    <renderless-date-interval-filter :format="format"
        v-on="$listeners">
        <template v-slot:default="{ interval, equals, update }">
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
                            <datepicker v-model="interval.min"
                                :format="format"
                                :is-warning="equals"
                                :locale="locale"
                                :placeholder="i18n(minLabel)"
                                :max="interval.max"
                                @input="update"/>
                        </div>
                        <div class="column">
                            <datepicker v-model="interval.max"
                                :format="format"
                                :is-warning="equals"
                                :locale="locale"
                                :placeholder="i18n(maxLabel)"
                                :min="interval.min"
                                @input="update"/>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </renderless-date-interval-filter>
</template>

<script>

import { VTooltip } from 'v-tooltip';
import { Datepicker } from '@enso-ui/datepicker/bulma';
import RenderlessDateIntervalFilter from '../renderless/DateIntervalFilter.vue';

export default {
    directives: { tooltip: VTooltip },

    components: { RenderlessDateIntervalFilter, Datepicker },

    props: {
        compact: {
            type: Boolean,
            default: false,
        },
        format: {
            type: String,
            default: 'd-m-Y',
        },
        i18n: {
            type: Function,
            default: v => v,
        },
        locale: {
            type: String,
            default: 'en',
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
