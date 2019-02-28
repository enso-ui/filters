<template>
    <vue-filter icons
        :options="options"
        v-bind="$attrs"
        v-on="$listeners"/>
</template>

<script>

import VueFilter from './VueFilter.vue';

export default {
    components: { VueFilter },

    data: () => ({
        options: [{
            value: true,
            label: 'check',
            class: 'has-text-success',
        }, {
            value: false,
            label: 'times',
            class: 'has-text-danger',
        }],
    }),
};

</script>
