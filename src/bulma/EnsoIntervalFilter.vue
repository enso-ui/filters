<template>
    <interval-filter v-bind="$attrs"
        v-on="$listeners"
        :i18n="__"/>
</template>

<script>

import IntervalFilter from './IntervalFilter.vue';

export default {
    components: { IntervalFilter },
};

</script>
