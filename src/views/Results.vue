<template>
  <div class="results">
    <h1>Results</h1>
    <search-panel>
    </search-panel>
  </div>
</template>

<script>
import SearchPanel from "@/components/search-panel";
export default {
  name: "Results",
  components: {SearchPanel},
  mounted() {
    const payload = {
      owner: "htmlacademy-nodejs",
      repo: "buy-and-sell",
      per_page: 10,
    };
    this.$store.dispatch("getForks", payload);
  },
};
</script>
