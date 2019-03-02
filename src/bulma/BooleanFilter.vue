<template>
    <vue-filter icons
        :options="options"
        v-bind="$attrs"
        v-on="$listeners"/>
</template>

<script>

import VueFilter from './VueFilter.vue';

export default {
    name: 'BooleanFilter',

    components: { VueFilter },

    data: () => ({
        options: [{
            value: true,
            icon: 'check',
            class: 'has-text-success',
        }, {
            value: false,
            icon: 'times',
            class: 'has-text-danger',
        }],
    }),
};

</script>
