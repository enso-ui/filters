<template>
    <interval-filter :i18n="__"
        v-bind="$attrs"
        v-on="$listeners"/>
</template>

<script>
import IntervalFilter from './IntervalFilter.vue';

export default {
    name: 'IntervalFilter',

    components: { IntervalFilter },
};
</script>
