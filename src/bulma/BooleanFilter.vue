<template>
    <vue-filter icons
        :options="options"/>
</template>

<script>
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import VueFilter from './VueFilter.vue';

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
            icon: faCheck,
            class: 'has-text-success',
        }, {
            value: v.numeric ? 0 : false,
            icon: faTimes,
            class: 'has-text-danger',
        }],
    }),
};
</script>
