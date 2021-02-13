<template lang="pug">
  form.search
    .search__container
      input.search__input(
      type="text"
      v-model="value"
      placeholder="vuejs/vue"
      )
      button.search__button(
        :class="{'preload':preload}"
        :disabled="preload || !isValid"
        :title="buttonTitle"
        @click.prevent="onClickButton"
      ) Найти
</template>

<script>
export default {
  name: "search-panel",
  data() {
    return {
      value: "",
      preload: false,
    };
  },
  props: {
    presetValue: {
      type: String,
      default: "",
    },
  },
  computed: {
    values() {
      return this.value.split("/");
    },
    isValid() {
      return this.values.length === 2;
    },
    buttonTitle() {
      return this.isValid ? "" : "Имя репозитория не соответствует требованиям";
    },
  },
  methods: {
    onClickButton() {
      this.preload = true;

      this.$store.commit("setSearchRequest", this.value);

      this.getData();
    },
    async getData() {
      await this.$store.dispatch("getRepo", {
        owner: this.values[0],
        repo: this.values[1],
      });
      this.preload = false;
      this.$emit("request-completed");
    },
  },
  created() {
    this.value = this.presetValue;
  },
};
</script>
