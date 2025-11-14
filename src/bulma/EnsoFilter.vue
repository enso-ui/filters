<template>
    <vue-filter :i18n="i18n"/>
</template>

<script setup>
import { inject } from 'vue';
import VueFilter from './VueFilter.vue';

const i18n = inject('i18n');

</script>
