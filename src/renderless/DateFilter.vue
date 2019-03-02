<script>
import {
    addDays, format, subDays, subMonths, subWeeks,
} from 'date-fns';

import intervals from './intervals';

export default {
    mixins: [intervals],

    props: {
        default: {
            type: String,
            default: 'today',
            validator: v => ['today', 'yesterday', 'last week', 'last month', 'all']
                .includes(v),
        },
    },

    data: v => ({
        filters: {
            today: 'today',
            yesterday: 'yesterday',
            lastWeek: 'last week',
            lastMonth: 'last month',
            custom: 'custom',
            all: 'all',
        },
        filter: v.default,
    }),

    computed: {
        custom() {
            return this.filter === this.filters.custom;
        },
    },

    created() {
        this.update();
    },

    methods: {
        setFilter(filter) {
            this.filter = filter;
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
        lastWeek() {
            this.interval.min = format(subWeeks(new Date(), 1), this.alternateFormat);
            this.interval.max = format(addDays(new Date(), 1), this.alternateFormat);
        },
        lastMonth() {
            this.interval.min = format(subMonths(new Date(), 1), this.alternateFormat);
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
                click: () => this.setFilter('today'),
            },
            filterEvents: type => ({
                click: () => this.setFilter(type),
            }),
            filters: this.filters,
            filter: this.filter,
            custom: this.custom,
        });
    },
};
</script>
