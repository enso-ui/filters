<script>
export default {
    name: 'CoreIntervalFilter',

    props: {
        value: {
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

    computed: {
        invalid() {
            return this.value.min !== null
                && this.value.max !== null
                && this.value.min > this.value.max;
        },
    },

    methods: {
        update() {
            this.$emit('input', this.value);
        },
    },

    render() {
        return this.$scopedSlots.default({
            invalid: this.invalid,
            value: this.value,
            minBindings: {
                value: this.value.min,
                type: this.type,
            },
            minEvents: {
                input: (e) => {
                    this.value.min = e.target.value;
                    this.update();
                },
            },
            maxBindings: {
                value: this.value.max,
                type: this.type,
            },
            maxEvents: {
                input: (e) => {
                    this.value.max = e.target.value;
                    this.update();
                },
            },
            minClearEvents: {
                click: () => {
                    this.value.min = null;
                    this.update();
                },
            },
            maxClearEvents: {
                click: () => {
                    this.value.max = null;
                    this.update();
                },
            },
        });
    },
};
</script>
