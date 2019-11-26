<script>
export default {
    name: 'CoreInputFilter',

    props: {
        value: {
            type: String,
            default: 'text',
        },
        type: {
            type: String,
            default: 'text',
        },
    },

    render() {
        return this.$scopedSlots.default({
            value: this.value,
            bindings: {
                value: this.value,
                type: this.type,
            },
            events: {
                input: (e) => {
                    this.$emit('input', e.target.value);
                },
            },
            clearEvents: {
                click: () => {
                    this.$emit('input', null);
                },
            },
        });
    },
};
</script>
