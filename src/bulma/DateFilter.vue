<template>
    <renderless-date-filter :format="format"
        v-on="$listeners">
        <template v-slot:default="{
                interval, filter, custom, equals, filters, update, setFilter
            }">
            <div class="date-filter is-paddingless">
                <div class="header has-text-centered has-background-light"
                    v-if="!compact">
                    <strong>
                        {{ title }}
                    </strong>
                </div>
                <div v-tooltip="compact ? title : null"
                    class="filter-wrapper"
                    :class="{ 'has-background-light': compact }">
                    <fade mode="out-in">
                        <div v-if="!custom"
                            key="tags"
                            class="tags-wrapper has-text-centered animated">
                            <div class="filter-tags">
                                <span class="tag"
                                    :class="{ 'is-warning': filter === key }"
                                    v-for="(type, key) in filters"
                                    :key="key"
                                    @click="setFilter(key)">
                                    {{ i18n(type) }}
                                </span>
                            </div>
                        </div>
                        <div v-else
                            key="dates"
                            class="dates-wrapper animated">
                            <div class="columns is-mobile is-variable is-1 is-centered">
                                <div class="column is-narrow">
                                    <a class="button is-naked">
                                        <span class="icon is-small"
                                            @click="setFilter('today')">
                                            <fa icon="arrow-left"/>
                                        </span>
                                    </a>
                                </div>
                                <div class="column">
                                    <datepicker v-model="interval.min"
                                        :format="format"
                                        :is-warning="equals"
                                        :locale="locale"
                                        :placeholder="i18n('From')"
                                        :disabled="!custom"
                                        :max="interval.max"
                                        @input="update()"/>
                                </div>
                                <div class="column">
                                    <datepicker v-model="interval.max"
                                        :format="format"
                                        :is-warning="equals"
                                        :locale="locale"
                                        :placeholder="i18n('To')"
                                        :disabled="!custom"
                                        :min="interval.min"
                                        @input="update()"/>
                                </div>
                            </div>
                        </div>
                    </fade>
                </div>
            </div>
        </template>
    </renderless-date-filter>
</template>

<script>


import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { VTooltip } from 'v-tooltip';
import Datepicker from '@enso-ui/datepicker/bulma';
import { Fade } from '@enso-ui/transitions';
import RenderlessDateFilter from '../renderless/DateFilter.vue';

library.add(faArrowLeft);

export default {
    directives: { tooltip: VTooltip },

    components: { RenderlessDateFilter, Fade, Datepicker },

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
    },

    computed: {
        title() {
            return this.custom
                ? this.i18n('Between')
                : this.i18n('When');
        },
    },
};

</script>

<style lang="scss">

    .date-filter {
        .header {
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
            padding-top: 0.5em;
        }

        .tag {
            cursor: pointer;
            margin: 2px;
        }

        .filter-wrapper {
            border-radius: inherit;
            padding: 0.25em;
        }

        .tags-wrapper {
            .filter-tags {
                min-height: 2.25em;
                padding: 0.2em;
            }
        }
    }

</style>
