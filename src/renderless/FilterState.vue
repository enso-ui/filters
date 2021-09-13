<script>
const keys = ['filters', 'intervals', 'params'];

export default {
    name: 'FilterState',

    props: {
        apiVersion: {
            type: Number,
            required: true,
        },
        filters: {
            type: Object,
            default: null,
        },
        intervals: {
            type: Object,
            default: null,
        },
        name: {
            type: String,
            required: true,
        },
        params: {
            type: Object,
            default: null,
        },
    },

    data: () => ({
        defaultFilters: null,
        defaultIntervals: null,
        defaultParams: null,
        state: null,
        keys: null,
    }),

    computed: {
        dirty() {
            return this.defaultFilters !== this.stringify(this.filters)
                || this.defaultIntervals !== this.stringify(this.intervals)
                || this.defaultParams !== this.stringify(this.params);
        },
    },

    watch: {
        state: {
            handler: 'persist',
            deep: true,
        },
        dirty: {
            handler(dirty) {
                this.$emit('state-updated', dirty);
            },
            immediate: true,
        },
    },

    created() {
        this.init();
        this.load();
    },

    methods: {
        init() {
            this.defaultFilters = this.stringify(this.filters);
            this.defaultIntervals = this.stringify(this.intervals);
            this.defaultParams = this.stringify(this.params);
            this.keys = keys.filter(key => !!this[key]);
            this.state = { apiVersion: this.apiVersion };
            this.keys.forEach(key => (this.state[key] = this[key]));
        },
        load() {
            const state = JSON.parse(localStorage.getItem(this.name));

            if (!!state && state.apiVersion === this.state.apiVersion) {
                this.keys.forEach(key => this.fill(this.state[key], state[key]));
            }

            this.persist();

            this.$emit('ready');
        },
        fill(to, from) {
            Object.keys(to).forEach(key => {
                if (to[key] && typeof to[key] === 'object' && !Array.isArray(to[key])) {
                    this.fill(to[key], from[key]);
                } else {
                    to[key] = from[key];
                }
            });
        },
        persist() {
            localStorage.setItem(this.name, JSON.stringify(this.state));
        },
        reset() {
            localStorage.removeItem(this.name);

            this.keys.forEach(key => this.fill(this[key], this.default(key)));
        },
        default(key) {
            key = `default${key.charAt(0).toUpperCase()}${key.slice(1)}`;
            return JSON.parse(this[key]);
        },
        stringify(object) {
            return object
                ? JSON.stringify(object)
                : null;
        },
    },

    render() {
        return this.$slots.default;
    },
};
</script>
