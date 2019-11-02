<script>
import { format, subDays, addDays } from 'date-fns';
import dateIntervals from './dateIntervals';

const Base = ['today', 'all'];
const Backward = ['yesterday', 'sevenDays', 'thirtyDays'];
const Forward = ['tomorrow', 'nextSevenDays', 'nextThirtyDays'];
const Custom = ['custom'];
const Labels = {
    today: 'today',
    yesterday: 'yesterday',
    tomorrow: 'tomorrow',
    sevenDays: '7 days',
    nextSevenDays: 'next 7 days',
    thirtyDays: '30 days',
    nextThirtyDays: 'next 30 days',
    custom: 'custom',
    all: 'all',
};

export default {
    name: 'CoreDateFilter',

    mixins: [dateIntervals],

    props: {
        default: {
            type: String,
            default: 'today',
            validator: v => Base.concat(Backward).concat(Forward).includes(v),
        },
        disabledOptions: {
            type: Array,
            default: () => ([]),
            validator: v => !v.some(val => !Base.concat(Backward).concat(Forward).concat(Custom).includes(val)),
        },
        direction: {
            type: Boolean,
            default: false,
        },
        forward: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            default: null,
            validator: v => Base.concat(Backward).concat(Forward).concat(Custom).includes(v),
        },
    },

    data: v => ({
        filter: v.value || v.default,
        isForward: null,
    }),

    beforeMount() {
        this.isForward = this.forward;
    },

    computed: {
        filters() {
            const options = this.isForward
                ? Base.concat(Forward).concat(Custom)
                : Base.concat(Backward).concat(Custom);

            return Object.keys(Labels)
                .reduce((filters, option) => {
                    if (options.includes(option)) {
                        filters[option] = Labels[option];
                    }

                    return filters;
                }, {});
        },
        custom() {
            return this.filter === this.filters.custom;
        },
    },

    watch: {
        value(value) {
            this.filter = value;
            this.update();
        },
    },

    created() {
        this.update();
    },

    methods: {
        setFilter(filter) {
            this.filter = filter;
            this.$emit('input', filter);
            this.update();
        },
        update() {
            if (this.filter !== this.filters.custom) {
                this[this.filter]();
            }

            this.$emit('update', this.sanitizedInterval);
        },
        all() {
            this.interval.min = null;
            this.interval.max = null;
        },
        today() {
            const today = new Date();
            this.interval.min = format(today.setHours(0, 0, 0, 0), this.alternateFormat);
            this.interval.max = format(today.setHours(23, 59, 59, 999), this.alternateFormat);
        },
        yesterday() {
            this.interval.min = format(subDays(new Date(), 1).setHours(0, 0, 0, 0), this.alternateFormat);
            this.interval.max = format(subDays(new Date(), 1).setHours(23, 59, 59, 999), this.alternateFormat);
        },
        tomorrow() {
            this.interval.min = format(addDays(new Date(), 1).setHours(0, 0, 0, 0), this.alternateFormat);
            this.interval.max = format(addDays(new Date(), 1).setHours(23, 59, 59, 999), this.alternateFormat);
        },
        sevenDays() {
            const today = new Date();
            this.interval.min = format(subDays(today, 6).setHours(0, 0, 0, 0), this.alternateFormat);
            this.interval.max = format(today.setHours(23, 59, 59, 999), this.alternateFormat);
        },
        nextSevenDays() {
            const today = new Date();
            this.interval.min = format(today.setHours(0, 0, 0, 0), this.alternateFormat);
            this.interval.max = format(addDays(today, 6).setHours(23, 59, 59, 999), this.alternateFormat);
        },
        thirtyDays() {
            const today = new Date();
            this.interval.min = format(subDays(today, 29).setHours(0, 0, 0, 0), this.alternateFormat);
            this.interval.max = format(today.setHours(23, 59, 59, 999), this.alternateFormat);
        },
        nextThirtyDays() {
            const today = new Date();
            this.interval.min = format(today.setHours(0, 0, 0, 0), this.alternateFormat);
            this.interval.max = format(addDays(today, 29).setHours(23, 59, 59, 999), this.alternateFormat);
        },
    },

    render() {
        return this.$scopedSlots.default({
            direction: this.direction,
            directionBindings: {
                value: this.isForward,
            },
            directionEvents: {
                input: (e) => {
                    this.isForward = e;
                    this.filter = 'today';
                },
            },
            minBindings: {
                value: this.interval.min,
                format: this.format,
                isWarning: this.equals,
                locale: this.locale,
                disabled: !this.custom,
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
                disabled: !this.custom,
                min: this.interval.min,
            },
            maxEvents: {
                input: (e) => {
                    this.interval.max = e;
                    this.update();
                },
            },
            backEvents: {
                click: () => this.setFilter(this.default),
            },
            filterEvents: type => ({
                click: () => this.setFilter(type),
            }),
            filters: Object.keys(this.filters).reduce((filters, key) => {
                if (!this.disabledOptions.includes(key)) {
                    filters[key] = this.filters[key];
                }

                return filters;
            }, {}),
            filter: this.filter,
            custom: this.custom,
        });
    },
};
</script>
