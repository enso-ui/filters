<script>
import {addDays} from 'date-fns';
import dateIntervals from './dateIntervals';
import dateFilters from './dateFilters';

const Dates = {
    today: { min: 0, max: 0},
    yesterday: { min: -1, max: -1},
    tomorrow: { min: 1, max: 1},
    sevenDays: { min: -6, max: 0},
    nextSevenDays: { min: 0, max: 6},
    nextThirtyDays: { min: 0, max: 29},
    thirtyDays: { min: -29, max: 0},
    custom: 'custom',
    all: 'all',
};

export default {
    name: 'CoreDateFilter',

    mixins: [dateIntervals, dateFilters],

    beforeMount() {
        this.isForward = this.forward;
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
                this.setDates();
            }

            this.$emit('update', this.sanitizedInterval);
        },
        setDates () {
            if (this.filter === this.filters.all) {
                this.interval.min = null;
                this.interval.max = null;

                return;
            }

            this.interval.min = this.dateFormat(addDays(new Date(), Dates[this.filter].min));
            this.interval.max = this.dateFormat(addDays(new Date(), Dates[this.filter].max), false);
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
