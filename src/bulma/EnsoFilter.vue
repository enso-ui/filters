<template>
    <vue-filter v-bind="$attrs"
        :i18n="i18n"/>
</template>

<script>
import VueFilter from './VueFilter.vue';

export default {
    name: 'EnsoFilter',

    components: { VueFilter },

    inject: ['i18n'],
};
</script>
