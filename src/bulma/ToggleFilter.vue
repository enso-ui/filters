<template>
    <div class="vue-filter toggle-filter p-0">
        <div v-if="!compact && name"
            class="header has-text-centered px-2">
            <span class="label">{{ i18n(name) }}
                <span v-if="readonly"
                    class="icon is-small">
                    <fa :icon="faLock"
                        size="xs"/>
                </span>
            </span>
        </div>
        <div v-tooltip="compact ? i18n(name) : null"
            class="filter-wrapper">
            <div class="tabs is-toggle is-fullwidth filter-tabs">
                <ul>
                    <li :class="{ 'is-active': modelValue }">
                        <a @click="update">
                            <span class="filter-label">
                                <template v-if="translatable">
                                    {{ i18n(label) }}
                                </template>
                                <template v-else>
                                    {{ label }}
                                </template>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import 'v-tooltip/dist/v-tooltip.css';
import { VTooltip } from 'v-tooltip';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export default {
    name: 'ToggleFilter',

    directives: { tooltip: VTooltip },

    components: { Fa },

    props: {
        compact: {
            type: Boolean,
            default: false,
        },
        i18n: {
            type: Function,
            default: v => v,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        translatable: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: null,
        },
        name: {
            type: String,
            default: null,
        },
        modelValue: {
            type: [Boolean, null],
            required: true,
        },
    },

    emits: ['change', 'update:modelValue'],

    data: () => ({
        faLock,
    }),

    methods: {
        update() {
            if (!this.readonly) {
                this.$emit('update:modelValue', !this.modelValue);
            }
        },
    },
};
</script>

<style lang="scss" src="./styles/vue-filter.scss"></style>
<style lang="scss" src="./styles/toggle-filter.scss"></style>
