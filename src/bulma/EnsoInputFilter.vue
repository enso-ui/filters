<template>
    <input-filter :i18n="i18n"/>
</template>

<script>
import InputFilter from './InputFilter.vue';

export default {
    name: 'EnsoInputFilter',

    components: { InputFilter },

    inject: ['i18n'],
};
</script>
