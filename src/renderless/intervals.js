import { compareAsc, parse } from 'date-fns';

export default {
    props: {
        format: {
            type: String,
            default: 'd-m-Y',
        },
        interval: {
            type: Object,
            default: () => ({
                min: null,
                max: null,
            }),
            validator: v => Object.keys(v).includes('min')
                && Object.keys(v).includes('max'),
        },
        locale: {
            type: String,
            default: 'en',
        },
    },

    computed: {
        alternateFormat() {
            return this.format.replace('d', 'dd')
                .replace('m', 'MM')
                .replace('Y', 'yyyy');
        },
        sanitizedInterval() {
            return {
                min: this.interval.min || null,
                max: this.interval.max || null,
            };
        },
        parsedMax() {
            return parse(this.interval.max, this.alternateFormat, new Date());
        },
        parsedMin() {
            return parse(this.interval.min, this.alternateFormat, new Date());
        },
        equals() {
            return !!this.interval.min
                && !!this.interval.max
                && compareAsc(this.parsedMin, this.parsedMax) === 0;
        },
    },
};
