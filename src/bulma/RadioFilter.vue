<template>
    <div class="radio-filter vue-filter is-paddingless">
        <div v-if="!compact && name"
            class="header has-text-centered has-background-light px-2">
            <strong>{{ i18n(name) }}</strong>
        </div>
        <div class="tabs-wrapper"
            :class="{ 'has-background-light': compact }">
            <div class="radio-filter-options"
                role="radiogroup"
                :aria-label="i18n(name)">
                <label v-for="option in options"
                    :key="option.value"
                    class="radio-filter-option"
                    :class="{ 'is-active': option.value === model }">
                    <input type="radio"
                        :name="inputName"
                        :value="option.value"
                        :checked="option.value === model"
                        :disabled="readonly || disabled"
                        @change="update(option.value)">
                    <span class="filter-label"
                        :class="option.class">
                        {{ i18n(option.label) }}
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    computed, defineModel, defineProps,
} from 'vue';

const model = defineModel({
    required: true,
    type: null,
});

const props = defineProps({
    compact: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    i18n: {
        type: Function,
        default: v => v,
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
});

const fallbackName = `radio-filter-${Math.random().toString(36).slice(2)}`;
const inputName = computed(() => props.name ?? fallbackName);

const update = (value) => {
    if (props.readonly || props.disabled) {
        return;
    }

    model.value = value;
};
</script>

<style lang="scss">
    .radio-filter {
        .header {
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
            padding-top: 0.5em;
        }

        .tabs-wrapper {
            border-radius: inherit;
            padding: 0.25em;
        }

        .radio-filter-options {
            display: flex;
            height: 2.25em;
            gap: 0.2rem;
            padding: 0.2rem;
            border-radius: 4px;
        }

        .radio-filter-option {
            display: inline-flex;
            flex: 1 1 0;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            min-width: 0;
            margin: 0;
            padding: 0 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            opacity: 0.65;
            transition: background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;

            &:hover,
            &.is-active {
                opacity: 1;
            }

            &.is-active {
                background-color: white;
                box-shadow: 0 1px 4px rgba(10, 10, 10, 0.12);
                font-weight: 600;
            }

            input {
                flex: 0 0 auto;
                margin: 0;
                cursor: inherit;
            }
        }

        .filter-label {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
