<script>
export default {
    name: 'CoreIntervalFilter',

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

    inheritAttrs: false,

    computed: {
        invalid() {
            return ![null, ''].includes(this.modelValue.min)
                && ![null, ''].includes(this.modelValue.max)
                && (this.type === 'number'
                    ? Number.parseFloat(this.modelValue.min) > Number.parseFloat(this.modelValue.max)
                    : this.modelValue.min > this.modelValue.max);
        },
    },

    methods: {
        update() {
            this.$emit('update:modelValue', this.modelValue);
        },
    },

    render() {
        return this.$slots.default({
            invalid: this.invalid,
            modelValue: this.modelValue,
            minBindings: {
                modelValue: this.modelValue.min,
                type: this.type,
            },
            minEvents: {
                input: e => {
                    this.modelValue.min = e.target.value;
                    this.update();
                },
            },
            maxBindings: {
                modelValue: this.modelValue.max,
                type: this.type,
            },
            maxEvents: {
                input: e => {
                    this.modelValue.max = e.target.value;
                    this.update();
                },
            },
            minClearEvents: {
                click: () => {
                    this.modelValue.min = null;
                    this.update();
                },
            },
            maxClearEvents: {
                click: () => {
                    this.modelValue.max = null;
                    this.update();
                },
            },
        });
    },
};
</script>
