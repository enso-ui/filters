<script>
export default {
    name: 'CoreIntervalFilter',

    inheritAttrs: false,

    props: {
        modelValue: {
            type: Object,
            default: () => ({
                min: null,
                max: null,
            }),
            validator: v => Object.keys(v).includes('min')
                && Object.keys(v).includes('max'),
        },
        type: {
            type: String,
            default: 'number',
        },
    },

    emits: ['change', 'update:modelValue'],

    computed: {
        invalid() {
            return ![null, ''].includes(this.modelValue.min)
                && ![null, ''].includes(this.modelValue.max)
                && (this.type === 'number'
                    ? Number.parseFloat(this.modelValue.min)
                        > Number.parseFloat(this.modelValue.max)
                    : this.modelValue.min > this.modelValue.max);
        },
    },

    methods: {
        updateMin(min) {
            this.$emit('update:modelValue', {
                ...this.modelValue, min
            });
        },
        updateMax(max) {
            this.$emit('update:modelValue', {
                ...this.modelValue, max
            });
        },
    },

    render() {
        return this.$slots.default({
            invalid: this.invalid,
            modelValue: this.modelValue,
            minBindings: {
                value: this.modelValue.min,
            },
            minEvents: {
                input: e => this.updateMin(e.target.value),
            },
            maxBindings: {
                value: this.modelValue.max,
            },
            maxEvents: {
                input: e => this.updateMax(e.target.value),
            },
            minClearEvents: {
                click: () => this.updateMin(null),
            },
            maxClearEvents: {
                click: () => this.updateMax(null),
            },
        });
    },
};
</script>
