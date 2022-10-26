<script>
export default {
    name: 'CoreInputFilter',

    inheritAttrs: false,

    props: {
        modelValue: {
            type: [Number, String],
            required: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        min: {
            type: Number,
            default: null,
        },
        max: {
            type: Number,
            default: null,
        },
        step: {
            type: Number,
            default: null,
        },
    },

    emits: ['update:modelValue'],

    render() {
        return this.$slots.default({
            modelValue: this.modelValue,
            bindings: {
                value: this.modelValue,
                type: this.type,
                min: this.min,
                max: this.max,
                step: this.step,
            },
            events: {
                input: e => this.$emit('update:modelValue', e.target.value),
            },
            clearEvents: {
                click: () => this.$emit('update:modelValue', null),
            },
        });
    },
};
</script>
