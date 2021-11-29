<script>
import dateIntervals from './dateIntervals';

export default {
    name: 'CoreDateIntervalFilter',

    mixins: [dateIntervals],

    emits: ['update'],

    inheritAttrs: false,

    methods: {
        update() {
            this.$emit('update', this.sanitizedInterval);
        },
    },

    render() {
        return this.$slots.default({
            minBindings: {
                modelValue: this.interval.min,
                format: this.format,
                isWarning: this.equals,
                locale: this.locale,
                max: this.interval.max,
            },
            minEvents: {
                'update:modelValue': e => {
                    this.interval.min = e;
                    this.update();
                },
            },
            maxBindings: {
                modelValue: this.interval.max,
                format: this.format,
                isWarning: this.equals,
                locale: this.locale,
                min: this.interval.min,
            },
            maxEvents: {
                'update:modelValue': e => {
                    this.interval.max = e;
                    this.update();
                },
            },
        });
    },
};
</script>
