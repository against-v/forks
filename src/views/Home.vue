<template>
  <div class="home container">
    <div class="home__title">
      <h1 class="title">Поиск форков у репозитория</h1>
      <p class="subtitle">Введите в поисковую строку название репозитория в формате <b>:owner/:repositoryName</b>, нажмите поиск и получите результат!</p>
    </div>
    <div class="home__search">
      <search-panel @request-completed="showResults"></search-panel>
    </div>
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
