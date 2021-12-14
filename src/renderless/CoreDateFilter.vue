<script>
import {
    compareAsc, format, addDays, startOfDay, endOfDay, addWeeks,
    startOfWeek, endOfWeek, addMonths, startOfMonth, endOfMonth,
    addYears, startOfYear, endOfYear, parse
} from 'date-fns';
import { lcwords } from '@enso-ui/strings';
import {
    Intervals, Base, Past, Future, Adjustments,
} from './intervals';

export default {
    name: 'CoreDateFilter',

    inheritAttrs: false,

    props: {
        direction: {
            type: Boolean,
            default: false,
        },
        excluded: {
            type: Array,
            default: () => ([]),
            validator: v => !v.some(val => !Base.concat(Past)
                .concat(Future).includes(val)),
        },
        filter: {
            type: String,
            required: true,
            validator: v => Base.concat(Past)
                .concat(Future).includes(v),
        },
        format: {
            type: String,
            default: 'Y-m-d H:i:s',
        },
        future: {
            type: Boolean,
            default: false,
        },
        interval: {
            type: Object,
            required: true,
            validator: v => Object.keys(v).includes('min')
                && Object.keys(v).includes('max'),
        },
        locale: {
            type: String,
            default: 'en',
        },
        weekStartsOn: {
            type: Number,
            default: 1,
            validator: v => Number.isInteger(v) && v >= 0 && v <= 6,
        },
    },

    emits: ['update:filter', 'update:interval'],

    data: v => ({
        isFuture: v.future,
    }),

    computed: {
        adjustment() {
            return Adjustments[this.filter];
        },
        custom() {
            return this.filter === Intervals.custom;
        },
        default() {
            return Base.find(value => !this.excluded.includes(value));
        },
        equals() {
            return !!this.interval.min
                && !!this.interval.max
                && compareAsc(this.parsedMin, this.parsedMax) === 0;
        },
        filters() {
            return Object.keys(Intervals)
                .filter(option => this.options.includes(Intervals[option]))
                .reduce((filters, option) => {
                    filters[option] = this.label(Intervals[option]);
                    return filters;
                }, {});
        },
        internalFormat() {
            return this.format.replace('d', 'dd')
                .replace('m', 'MM')
                .replace('Y', 'yyyy')
                .replace('H', 'HH')
                .replace('i', 'mm')
                .replace('s', 'ss');
        },
        options() {
            return Base.concat(this.isFuture ? Future : Past);
        },
        parsedMax() {
            return parse(this.interval.max, this.internalFormat, new Date());
        },
        parsedMin() {
            return parse(this.interval.min, this.internalFormat, new Date());
        },
    },

    watch: {
        filter: 'update',
    },

    created() {
        this.update();
    },

    methods: {
        update(filter = this.filter) {
            switch (filter) {
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
        label(option) {
            return lcwords(option);
        },
        daily() {
            const min = startOfDay(addDays(new Date(), this.adjustment));
            const max = endOfDay(addDays(new Date(), this.adjustment));

            const interval = { min: this.date(min), max: this.date(max) };

            this.$emit('update:interval', interval);
        },
        weekly() {
            const options = { weekStartsOn: this.weekStartsOn };
            const min = startOfWeek(addWeeks(new Date(), this.adjustment), options);
            const max = endOfWeek(addWeeks(new Date(), this.adjustment), options);

            const interval = { min: this.date(min), max: this.date(max) };

            this.$emit('update:interval', interval);
        },
        monthly() {
            const min = startOfMonth(addMonths(new Date(), this.adjustment));
            const max = endOfMonth(addMonths(new Date(), this.adjustment));

            const interval = { min: this.date(min), max: this.date(max) };

            this.$emit('update:interval', interval);
        },
        yearly() {
            const min = startOfYear(addYears(new Date(), this.adjustment));
            const max = endOfYear(addYears(new Date(), this.adjustment));

            const interval = { min: this.date(min), max: this.date(max) };

            this.$emit('update:interval', interval);
        },
        all() {
            const interval = { min: null, max: null };

            this.$emit('update:interval', interval);
        },
        date(date) {
            return format(date, this.internalFormat);
        },
    },

    render() {
        return this.$slots.default({
            backEvents: {
                click: () => this.$emit('update:filter', this.default),
            },
            custom: this.custom,
            direction: this.direction,
            directionBindings: {
                modelValue: this.isFuture,
            },
            directionEvents: {
                'update:modelValue': e => {
                    this.isFuture = e;
                    this.$emit('update:filter', this.default);
                },
            },
            filter: this.filter,
            filters: Object.keys(this.filters)
                .filter(key => !this.excluded.includes(key))
                .reduce((filters, key) => {
                    filters[key] = this.filters[key];
                    return filters;
                }, {}),
            filterEvents: filter => ({
                click: () => this.$emit('update:filter', filter),
            }),
            minBindings: {
                modelValue: this.interval.min,
                format: this.format,
                isWarning: this.equals,
                locale: this.locale,
                disabled: !this.custom,
                max: this.interval.max,
            },
            minEvents: {
                'update:modelValue': e => {
                    const interval = { min: e, max: this.interval.max };
                    this.$emit('update:interval', interval);
                },
            },
            maxBindings: {
                modelValue: this.interval.max,
                format: this.format,
                isWarning: this.equals,
                locale: this.locale,
                disabled: !this.custom,
                min: this.interval.min,
            },
            maxEvents: {
                'update:modelValue': e => {
                    const interval = { min: this.interval.min, max: e };
                    this.$emit('update:interval', interval);
                },
            },
        });
    },
};
</script>
