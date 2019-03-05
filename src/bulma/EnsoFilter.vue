<template>
    <vue-filter :i18n="__"
        v-bind="$attrs"
        v-on="$listeners"/>
</template>

<script>
import VueFilter from './VueFilter.vue';

export default {
    name: 'EnsoFilter',

    components: { VueFilter },
};
</script>
