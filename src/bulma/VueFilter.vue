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
                    <li v-for="(option, index) in options"
                        :key="index"
                        :class="{ 'is-active': option.value === value }">
                        <a @click="update(option.value)">
                            <span v-if="icons"
                                :class="['icon', option.class]">
                                <fa :icon="option.icon"/>
                            </span>
                            <span v-else
                                class="filter-label"
                                :class="option.class">
                                <template v-if="translatable">
                                    {{ i18n(option.label) }}
                                </template>
                                <template v-else>
                                    {{ option.label }}
                                </template>
                            </span>
                        </a>
                    </li>
                    <li v-if="!hideOff"
                        :class="{ 'is-active': value === null }">
                        <a @click="update()">
                            <span class="icon"
                                :class="value === null ? 'has-text-danger' : 'has-text-success'">
                                <fa icon="power-off"/>
                            </span>
                            <span v-if="!icons && offLabel"
                                class="filter-label">
                                {{ i18n(offLabel) }}
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPowerOff, faLock } from '@fortawesome/free-solid-svg-icons';
import { VTooltip } from 'v-tooltip';

library.add(faPowerOff, faLock);

export default {
    name: 'VueFilter',

    directives: { tooltip: VTooltip },

    components: { Fa },

    props: {
        compact: {
            type: Boolean,
            default: false,
        },
        hideOff: {
            type: Boolean,
            default: false,
        },
        i18n: {
            type: Function,
            default: v => v,
        },
        icons: {
            type: Boolean,
            default: false,
        },
        offLabel: {
            type: String,
            default: '',
        },
        options: {
            type: Array,
            default() {
                return [];
            },
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        translatable: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            default: null,
        },
        value: {
            type: null,
            default: null,
        },
    },

    methods: {
        update(value = null) {
            if (!this.readonly) {
                this.$emit('input', value);
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
