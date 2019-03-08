<template>
    <vue-filter :i18n="i18n"
        v-bind="$attrs"
        v-on="$listeners"/>
</template>

<script>
import VueFilter from './VueFilter.vue';

export default {
    name: 'EnsoFilter',

    inject: ['i18n'],

    components: { VueFilter },
};
</script>
