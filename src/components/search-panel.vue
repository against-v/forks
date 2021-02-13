<template lang="pug">
  form.search
    .search__container
      input.search__input(
      type="text"
      v-model="value"
      placeholder="vuejs/vue"
      )
      button.search__button(
        :disabled="!isValid"
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
      this.$emit("request-completed", ...this.values);
    },
  },
  created() {
    this.value = this.presetValue;
  },
};
</script>
