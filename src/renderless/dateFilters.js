import { format } from 'date-fns';

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
    data: v => ({
        filter: v.value || v.default,
        isForward: null,
    }),

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

    methods: {
        setFilter(filter) {
            this.filter = filter;
            this.$emit('input', filter);
            this.update();
        },

        dateFormat(date, startOfDay = true) {
            date = startOfDay
                ? date.setHours(0, 0, 0, 0)
                : date.setHours(23, 59, 59, 999);

            return format(date, this.internalFormat);
        },
    },
};
