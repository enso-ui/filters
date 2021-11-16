<template>
    <vue-filter v-bind="$attrs"
        icons
        :options="options"/>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import VueFilter from './VueFilter.vue';

library.add(faCheck, faTimes);

export default {
    name: 'BooleanFilter',

    components: { VueFilter },

    props: {
        numeric: {
            type: Boolean,
            default: false,
        },
    },

    data: v => ({
        options: [{
            value: v.numeric ? 1 : true,
            icon: 'check',
            class: 'has-text-success',
        }, {
            value: v.numeric ? 0 : false,
            icon: 'times',
            class: 'has-text-danger',
        }],
    }),
};
</script>
