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
      adaptedValue: "",
      params: {
        owner: "",
        repo: "",
        per_page: 10,
        page: 1,
      },
    };
  },
  methods: {
    onClickButton() {
      this.valueAsArray = this.value.split("/");

      if (this.validation(this.valueAsArray)) {
        console.log("valid");
        this.setParams();
        this.getData();
      } else {
        console.log("not valid");
      }
    },
    validation(val) {
      return val.length === 2;
    },
    setParams() {
      this.params.owner = this.valueAsArray[0];
      this.params.repo = this.valueAsArray[1];
    },
    async getData() {
      try {
        const forksCount = await this.$store.dispatch("getForksCount", {
          owner: this.params.owner,
          repo: this.params.repo,
        });
        const forks = await this.$store.dispatch("getForks", this.params);
        console.log(forksCount);
        console.log(forks);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
