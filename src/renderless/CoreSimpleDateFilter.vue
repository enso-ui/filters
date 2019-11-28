<script>
import { addDays } from 'date-fns';
import dateIntervals from './dateIntervals';
import dateFilters from './dateFilters';

const Dates = {
    today: 0,
    yesterday: -1,
    tomorrow: 1,
    sevenDays: -7,
    nextSevenDays: 7,
    nextThirtyDays: 30,
    thirtyDays: -30,
    custom: 'custom',
    all: 'all',
};

export default {
    name: 'CoreSimpleDateFilter',

    mixins: [dateIntervals, dateFilters],

    props: {
        date: {
            type: String,
            default: null,
        },
    },

    data: () => ({
        currentDate : null,
    }),

    created() {
        this.isForward = this.forward;
        this.currentDate = this.date;
        this.update();
    },

    methods: {
        update() {
            if (this.filter !== this.filters.custom) {
                this.setDate();
            }

            this.$emit('update', this.currentDate);
        },
        setDate() {
            this.currentDate = this.filter === this.filters.all
                ? null
                : this.dateFormat(addDays(new Date(), Dates[this.filter]))
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
                    this.update();
                },
            },
            bindings: {
                value: this.currentDate,
                format: this.format,
                locale: this.locale,
                disabled: !this.custom,
            },
            events: {
                input: (date) => {
                    this.currentDate = date;
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
