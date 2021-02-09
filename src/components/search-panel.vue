<template>
  <div>
    <input
      type="text"
      v-model="value"
    >
    <button
      @click.prevent="onClickButton"
    >Search</button>
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
    };
  },
  methods: {
    onClickButton() {
      this.valueAsArray = this.value.split("/");

      if (this.validation(this.valueAsArray)) {
        this.owner = this.valueAsArray[0];
        this.repo = this.valueAsArray[1];
        this.getData();
      } else {
        console.log("not valid");
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
        console.error(err);
      }
    },
  },
};
</script>
