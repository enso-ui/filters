<script>

import intervals from './intervals';

export default {
    mixins: [intervals],

    methods: {
        update() {
            this.$emit('update', this.sanitizedInterval);
        },
    },

    render() {
        return this.$scopedSlots.default({
            interval: this.interval,
            equals: this.equals,
            update: this.update,
        });
    },
};

</script>
