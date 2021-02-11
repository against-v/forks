<template>
  <div class="search">
    <div class="search__container">
      <input
        class="search__input"
        type="text"
        v-model="value"
        placeholder="vuejs/vue"
        @input="showValidateError = false"
      >
      <button
        class="search__button"
        :class="{'preload':preload}"
        :disabled="preload"
        @click.prevent="onClickButton"
      >Найти</button>
    </div>
    <p
      v-show="showValidateError"
      class="search__error"
    >
      {{validateError}}
    </p>
  </div>
</template>

<script>
export default {
  name: "search-panel",
  data() {
    return {
      value: "",
      valueAsArray: [],
      repo: "",
      owner: "",
      validateError: "Неправильный формат названия репозитория",
      showValidateError: false,
      preload: false,
    };
  },
  props: {
    presetValue: {
      type: String,
      default: "",
    },
  },
  methods: {
    onClickButton() {
      this.preload = true;
      this.valueAsArray = this.value.split("/");
      if (this.validation(this.valueAsArray)) {
        this.owner = this.valueAsArray[0];
        this.repo = this.valueAsArray[1];
        this.getData();
      } else {
        this.showValidateError = true;
        this.preload = false;
      }
    },
    validation(val) {
      return val.length === 2;
    },
    async getData() {
      try {
        await this.$store.dispatch("getRepo", {
          owner: this.owner,
          repo: this.repo,
        });
        this.$emit("request-completed");
      } catch (err) {
        this.preload = false;
      }
    },
  },
  created() {
    this.value = this.presetValue;
  },
};
</script>
