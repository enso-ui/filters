<template>
    <div class="vue-filter is-paddingless">
        <div v-if="!compact"
            class="header has-text-centered has-background-light">
            <strong>{{ i18n(name) }}</strong>
            <span v-if="readonly"
                class="icon lock has-text-muted">
                <fa icon="lock"
                    size="xs"/>
            </span>
        </div>
        <div v-tooltip="compact ? i18n(name) : null"
            class="tabs-wrapper"
            :class="{ 'has-background-light': compact }">
            <div class="tabs is-toggle is-fullwidth filter-tabs">
                <ul>
                    <li :class="{ 'is-active': value }">
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
import { VTooltip } from 'v-tooltip';

export default {
    name: 'ToggleFilter',

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
        value: {
            type: Boolean,
            required: true,
        },
    },

    methods: {
        update() {
            if (!this.readonly) {
                this.$emit('input', !this.value);
            }
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

        .tabs-wrapper {
            border-radius: inherit;
            padding: 0.25em;

            .tabs {
                height: 2.25em;

                li {
                    a {
                        padding: 0.25em;
                    }
                }
            }
        }
    }
</style>
