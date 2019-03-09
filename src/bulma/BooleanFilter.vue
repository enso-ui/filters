<template>
    <vue-filter icons
        :options="options"
        v-bind="$attrs"
        v-on="$listeners"/>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import VueFilter from './VueFilter.vue';

library.add(faCheck, faTimes);

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
