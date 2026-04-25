<template>
    <div class="vue-filter p-0">
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
        <slot :readonly="readonly"/>
    </div>
</template>

<script>
import 'v-tooltip/dist/v-tooltip.css';
import { VTooltip } from 'v-tooltip';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export default {
    name: 'BaseSelectFilter',

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
        name: {
            type: String,
            default: null,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        faLock() {
            return faLock;
        },
    },
};

</script>

<style lang="scss" src="./styles/vue-filter.scss"></style>
