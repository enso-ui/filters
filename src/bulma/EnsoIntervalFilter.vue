<template>
    <interval-filter v-bind="$attrs"
        :i18n="i18n"/>
</template>

<script>
import IntervalFilter from './IntervalFilter.vue';

export default {
    name: 'EnsoIntervalFilter',

    components: { IntervalFilter },

    inject: ['i18n'],
};
</script>
