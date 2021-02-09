<template>
  <div class="home">
    <h1>Home</h1>
    <search-panel
    @request-completed="showResults"
    >
    </search-panel>
  </div>
</template>

<script>
import SearchPanel from "@/components/search-panel";
export default {
  name: "Home",
  components: {SearchPanel},
  methods: {
    showResults() {
      this.$router.push({
        name: "Results",
        query: {
          page: 1,
          forksCount: this.$store.getters.forksCount,
          repo: this.$store.getters.repoName,
          owner: this.$store.getters.ownerLogin,
        },
      });
    },
  },
};
</script>
