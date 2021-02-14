<template lang="pug">
  label.favorite(
    :class="{'active': value}"
  )
    input.favorite__input(
      type="checkbox"
      @change="onChange"
      v-model="value"
    )
    svg.favorite__icon(
      width="28"
      height="28"
      viewbox="0 0 28 28"
    )
      path(
        d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"
      )
</template>

<script>
export default {
  name: "button-fav",
  data() {
    return {
      value: false,
    };
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    presetValue: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange() {
      this.$emit("change", this.id, this.value);
    },
  },
  created() {
    this.value = this.presetValue;
  },
};
</script>
