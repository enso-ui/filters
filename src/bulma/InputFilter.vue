<template>
    <core-input-filter v-bind="$attrs"   >
        <template #default="{
                value, bindings, events, clearEvents,
            }">
            <div class="interval-filter is-paddingless">
                <div v-if="!compact"
                    class="header has-text-centered has-background-light">
                    <b>{{ i18n(name) }}</b>
                </div>
                <div v-tooltip="compact ? i18n(name) : null"
                    :class="['input-wrapper', {'has-background-light': compact}]">
                    <div class="columns is-mobile">
                        <div class="column">
                            <div class="control has-icons-right">
                                <input class="input control"
                                    v-bind="bindings"
                                    :placeholder="i18n(label)"
                                    v-on="events">
                                <span v-if="value"
                                    class="icon is-small is-right clear-button"
                                    v-on="clearEvents">
                                    <a class="delete is-small"/>
                                    <a class="delete is-small"/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </core-input-filter>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import CoreInputFilter from '../renderless/CoreInputFilter.vue';

export default {
    name: 'InputFilter',

    directives: { tooltip: VTooltip },

    components: { CoreInputFilter },

    props: {
        compact: {
            type: Boolean,
            default: false,
        },
        i18n: {
            type: Function,
            default: v => v,
        },
        label: {
            type: String,
            default: '',
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
