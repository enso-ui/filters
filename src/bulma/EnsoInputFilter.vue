<template>
    <input-filter v-bind="$attrs"
        :i18n="i18n"
        v-on="$listeners"/>
</template>

<script>
import InputFilter from './InputFilter.vue';

export default {
    name: 'EnsoInputFilter',

    components: { InputFilter },

    inject: ['i18n'],
};
</script>
