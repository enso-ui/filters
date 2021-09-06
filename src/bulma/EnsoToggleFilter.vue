<template>
    <toggle-filter v-bind="$attrs"
        :i18n="i18n"
        v-on="$listeners"/>
</template>

<script>
import ToggleFilter from './ToggleFilter.vue';

export default {
    name: 'EnsoToggleFilter',

    components: { ToggleFilter },

    inject: ['i18n'],
};
</script>
