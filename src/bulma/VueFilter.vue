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
        <div v-tooltip="!compact ? i18n(name) : null"
            class="filter-wrapper">
            <div class="tabs is-toggle is-fullwidth filter-tabs no-scrollbars">
                <ul>
                    <li v-for="(option, index) in options"
                        :key="index"
                        :class="cssClass(option)">
                        <a @click="update(option.value)">
                            <span v-if="icons"
                                :class="['icon is-small', option.class]">
                                <fa :icon="option.icon"/>
                            </span>
                            <span v-else
                                class="filter-label"
                                :class="option.class">
                                {{ i18n(option.label) }}
                            </span>
                        </a>
                    </li>
                    <li v-if="!hideOff"
                        :class="{ 'is-active': empty }">
                        <a @click="update()">
                            <span class="icon is-small"
                                :class="empty
                                    ? 'has-text-dark'
                                    : 'has-text-success'">
                                <fa :icon="faPowerOff"/>
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

<script setup>
import 'v-tooltip/dist/v-tooltip.css';
import { computed } from 'vue';
import { VTooltip } from 'v-tooltip';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faPowerOff, faLock } from '@fortawesome/free-solid-svg-icons';

defineOptions({
    directives: {
        tooltip: VTooltip,
    },
});

const model = defineModel({
    required: true,
    type: null,
});

const props = defineProps({
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
    name: {
        type: String,
        default: null,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
});

const cssClass = option => ({
    'is-active': props.multiple
        ? model.value.includes(option.value)
        : option.value === model.value,
});

const empty = computed(() => (props.multiple
    ? model.value.length < 1
    : model.value === null));

const update = (value = null) => {
    if (props.readonly) {
        return;
    }

    if (!props.multiple) {
        model.value = value;
        return;
    }

    if (value === null) {
        model.value = [];
        return;
    }

    const current = Array.isArray(model.value) ? [...model.value] : [];

    const index = current.indexOf(value);

    if (index === -1) {
        current.push(value);
    } else {
        current.splice(index, 1);
    }

    model.value = current;
};
</script>

<style lang="scss" src="./styles/vue-filter.scss"></style>
