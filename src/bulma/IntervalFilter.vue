<template>
    <renderless-interval-filter v-on="$listeners">
        <template v-slot:default="{ interval, invalid, update }">
            <div class="interval-filter is-paddingless">
                <div v-if="!compact"
                    class="header has-text-centered has-background-light">
                    <b>{{ i18n(title) }}</b>
                </div>
                <div v-tooltip="compact ? i18n(title) : null"
                    :class="['input-wrapper', {'has-background-light': compact}]">
                    <div class="columns is-mobile">
                        <div class="column">
                            <div class="control has-icons-right">
                                <input v-model="interval.min"
                                    class="input control"
                                    :class="[{ 'is-danger': invalid }]"
                                    :placeholder="i18n(minLabel)"
                                    :type="type"
                                    @input="update">
                                <span v-if="interval.min"
                                    class="icon is-small is-right clear-button"
                                    @click="interval.min = null; update()">
                                    <a class="delete is-small"/>
                                </span>
                            </div>
                        </div>
                        <div class="column">
                            <div class="control has-icons-right">
                                <input v-model="interval.max"
                                    class="input control"
                                    :class="[{ 'is-danger': invalid }]"
                                    :placeholder="i18n(maxLabel)"
                                    :type="type"
                                    @input="update">
                                <span v-if="interval.max"
                                    class="icon is-small is-right clear-button"
                                    @click="interval.max = null; update()">
                                    <a class="delete is-small"/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </renderless-interval-filter>
</template>

<script>

import { VTooltip } from 'v-tooltip';
import RenderlessIntervalFilter from '../renderless/IntervalFilter.vue';

export default {
    directives: { tooltip: VTooltip },

    components: { RenderlessIntervalFilter },

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
        title: {
            type: String,
            default: null,
        },
        type: {
            type: String,
            default: 'number',
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
