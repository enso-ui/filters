<template>
    <div class="input-filter p-0"
        :class="$attrs.class">
        <div v-if="!compact"
            class="header filter-header has-text-centered px-2">
            <b>{{ i18n(name) }}</b>
        </div>
        <div v-tooltip="compact ? i18n(name) : null"
            :class="['input-wrapper', { 'filter-surface': compact }]">
            <core-input-filter v-bind="$attrs">
                <template #default="{
                        modelValue, bindings, events, clearEvents,
                    }">
                    <div class="control has-icons-right">
                        <input class="input control"
                            v-bind="bindings"
                            :placeholder="i18n(label)"
                            v-on="events">
                        <span v-if="modelValue"
                            class="icon is-small is-right clear-button"
                            v-on="clearEvents">
                            <a class="delete is-small"/>
                        </span>
                    </div>
                </template>
            </core-input-filter>
        </div>
    </div>
</template>

<script>
import 'v-tooltip/dist/v-tooltip.css';
import { VTooltip } from 'v-tooltip';
import CoreInputFilter from '../renderless/CoreInputFilter.vue';

export default {
    name: 'InputFilter',

    directives: { tooltip: VTooltip },

    components: { CoreInputFilter },

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
