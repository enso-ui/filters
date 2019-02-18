<script>

export default {
    data: () => ({
        interval: {
            min: null,
            max: null,
        },
    }),

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
            interval: this.interval,
            invalid: this.invalid,
            update: this.update,
        });
    },
};

</script>
