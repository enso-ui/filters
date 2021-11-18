<script>
export default {
    name: 'CoreInputFilter',

    props: {
        modelValue: {
            type: String,
            default: 'text',
        },
        type: {
            type: String,
            default: 'text',
        },
    },

    emits: ['update:modelValue'],

    render() {
        return this.$slots.default({
            modelValue: this.modelValue,
            bindings: {
                modelValue: this.modelValue,
                type: this.type,
            },
            events: {
                input: e => {
                    this.$emit('update:modelValue', e.target.value);
                },
            },
            clearEvents: {
                click: () => {
                    this.$emit('update:modelValue', null);
                },
            },
        });
    },
};
</script>
