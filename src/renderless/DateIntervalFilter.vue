<script>

import intervals from './intervals';

export default {
    mixins: [intervals],

    methods: {
        update() {
            this.$emit('update', this.sanitizedInterval);
        },
    },

    render() {
        return this.$scopedSlots.default({
            minBindings: {
                value: this.interval.min,
                format: this.format,
                isWarning: this.equals,
                locale: this.locale,
                max: this.interval.max,
            },
            minEvents: {
                input: (e) => {
                    this.interval.min = e;
                    this.update();
                },
            },
            maxBindings: {
                value: this.interval.max,
                format: this.format,
                isWarning: this.equals,
                locale: this.locale,
                min: this.interval.min,
            },
            maxEvents: {
                input: (e) => {
                    this.interval.max = e;
                    this.update();
                },
            },
        });
    },
};

</script>
