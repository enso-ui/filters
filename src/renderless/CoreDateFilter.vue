<script>
import { addDays, format, subDays } from 'date-fns';
import dateIntervals from './dateIntervals';

export default {
    name: 'CoreDateFilter',

    mixins: [dateIntervals],

    props: {
        default: {
            type: String,
            default: 'today',
            validator: v => ['today', 'yesterday', 'sevenDays', 'thirtyDays', 'all']
                .includes(v),
        },
        disabledOptions: {
            type: Array,
            default: () => ([]),
            validator: v => !v.some(val => !['today', 'yesterday', 'sevenDays', 'thirtyDays', 'custom', 'all']
                .includes(val)),
        },
        value: {
            type: String,
            default: null,
            validator: v => ['today', 'yesterday', 'sevenDays', 'thirtyDays', 'custom', 'all']
                .includes(v),
        },
    },

    data: v => ({
        filters: {
            today: 'today',
            yesterday: 'yesterday',
            sevenDays: '7 days',
            thirtyDays: '30 days',
            custom: 'custom',
            all: 'all',
        },
        filter: v.value || v.default,
    }),

    computed: {
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
            this.interval.min = format(new Date(), this.alternateFormat);
            this.interval.max = format(addDays(new Date(), 1), this.alternateFormat);
        },
        yesterday() {
            this.interval.min = format(subDays(new Date(), 1), this.alternateFormat);
            this.interval.max = format(new Date(), this.alternateFormat);
        },
        sevenDays() {
            this.interval.min = format(subDays(new Date(), 7), this.alternateFormat);
            this.interval.max = format(addDays(new Date(), 1), this.alternateFormat);
        },
        thirtyDays() {
            this.interval.min = format(subDays(new Date(), 30), this.alternateFormat);
            this.interval.max = format(addDays(new Date(), 1), this.alternateFormat);
        },
    },

    render() {
        return this.$scopedSlots.default({
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
