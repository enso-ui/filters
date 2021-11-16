<script>
import {
    format, addDays, startOfDay, endOfDay, addWeeks, startOfWeek, endOfWeek,
    addMonths, startOfMonth, endOfMonth, addYears, startOfYear, endOfYear,
} from 'date-fns';
import { lcwords } from '@enso-ui/strings';
import dateIntervals from './dateIntervals';
import {
    Intervals, Base, Past, Future, Adjustments,
} from './intervals';

export default {
    name: 'CoreDateFilter',

    mixins: [dateIntervals],

    props: {
        default: {
            type: String,
            default: Intervals.today,
            validator: v => Base.concat(Past)
                .concat(Future).includes(v),
        },
        direction: {
            type: Boolean,
            default: false,
        },
        disabledOptions: {
            type: Array,
            default: () => ([]),
            validator: v => !v.some(val => !Base.concat(Past)
                .concat(Future).includes(val)),
        },
        future: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            default: null,
            validator: v => Base.concat(Past)
                .concat(Future).includes(v),
        },
        weekStartsOn: {
            type: Number,
            default: 1,
            validator: v => Number.isInteger(v) && v >= 0 && v <= 6,
        },
    },

    data: v => ({
        filter: v.value || v.default,
        isFuture: false,
    }),

    computed: {
        adjustment() {
            return Adjustments[this.filter];
        },
        custom() {
            return this.filter === Intervals.custom;
        },
        filters() {
            return Object.keys(Intervals)
                .filter(option => this.options.includes(Intervals[option]))
                .reduce((filters, option) => {
                    filters[option] = this.label(Intervals[option]);
                    return filters;
                }, {});
        },
        options() {
            return Base.concat(this.isFuture ? Future : Past);
        },
    },

    watch: {
        value(value) {
            this.filter = value;
            this.update();
        },
    },

    beforeMount() {
        this.isFuture = this.future;
    },

    created() {
        this.update();
    },

    methods: {
        set(filter) {
            this.filter = filter;
            this.$emit('input', filter);
            this.update();
        },
        update() {
            this.adjust();
            this.$emit('update', this.sanitizedInterval);
        },
        label(option) {
            return lcwords(option);
        },
        adjust() {
            switch (this.filter) {
            case Intervals.today:
            case Intervals.yesterday:
            case Intervals.tomorrow:
                this.daily();
                break;
            case Intervals.lastWeek:
            case Intervals.thisWeek:
            case Intervals.nextWeek:
                this.weekly();
                break;
            case Intervals.lastMonth:
            case Intervals.thisMonth:
            case Intervals.nextMonth:
                this.monthly();
                break;
            case Intervals.lastYear:
            case Intervals.thisYear:
            case Intervals.nextYear:
                this.yearly();
                break;
            case Intervals.all:
                this.all();
                break;
            case Intervals.custom:
                break;
            default:
                throw Error('Unknown Interval');
            }
        },
        daily() {
            const min = startOfDay(addDays(new Date(), this.adjustment));
            const max = endOfDay(addDays(new Date(), this.adjustment));

            this.interval.min = this.date(min);
            this.interval.max = this.date(max);
        },
        weekly() {
            const options = { weekStartsOn: this.weekStartsOn };
            const min = startOfWeek(addWeeks(new Date(), this.adjustment), options);
            const max = endOfWeek(addWeeks(new Date(), this.adjustment), options);

            this.interval.min = this.date(min);
            this.interval.max = this.date(max);
        },
        monthly() {
            this.interval.min = this.date(startOfMonth(addMonths(new Date(), this.adjustment)));
            this.interval.max = this.date(endOfMonth(addMonths(new Date(), this.adjustment)));
        },
        yearly() {
            this.interval.min = this.date(startOfYear(addYears(new Date(), this.adjustment)));
            this.interval.max = this.date(endOfYear(addYears(new Date(), this.adjustment)));
        },
        all() {
            this.interval.min = null;
            this.interval.max = null;
        },
        date(date) {
            return format(date, this.internalFormat);
        },
    },

    render() {
        return this.$slots.default({
            backEvents: {
                click: () => this.set(this.default),
            },
            custom: this.custom,
            direction: this.direction,
            directionBindings: {
                value: this.isFuture,
            },
            directionEvents: {
                input: (e) => {
                    this.isFuture = e;
                    this.filter = 'today';
                },
            },
            filter: this.filter,
            filters: Object.keys(this.filters)
                .filter(key => !this.disabledOptions.includes(key))
                .reduce((filters, key) => {
                    filters[key] = this.filters[key];
                    return filters;
                }, {}),
            filterEvents: type => ({
                click: () => this.set(type),
            }),
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
        });
    },
};
</script>
