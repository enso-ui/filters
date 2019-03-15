<script>
export default {
    name: 'CoreIntervalFilter',

    props: {
        interval: {
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
            return this.interval.min !== null
                && this.interval.max !== null
                && this.interval.min > this.interval.max;
        },
    },

    methods: {
        update() {
            this.$emit('update', this.interval);
        },
    },

    render() {
        return this.$scopedSlots.default({
            invalid: this.invalid,
            interval: this.interval,
            minBindings: {
                value: this.interval.min,
                type: this.type,
            },
            minEvents: {
                input: (e) => {
                    this.interval.min = e;
                    this.update();
                },
            },
            maxBindings: {
                value: this.interval.max,
                type: this.type,
            },
            maxEvents: {
                input: (e) => {
                    this.interval.max = e;
                    this.update();
                },
            },
            minClearEvents: {
                click: () => {
                    this.interval.min = null;
                    this.update();
                },
            },
            maxClearEvents: {
                click: () => {
                    this.interval.min = null;
                    this.update();
                },
            },
        });
    },
};
</script>
