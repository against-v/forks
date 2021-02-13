<template lang="pug">
  .home.container
    .home__title
      h1.title Поиск форков у репозитория
      p.subtitle Введите в поисковую строку название репозитория в формате <b>:owner/:repositoryName</b>, нажмите поиск и получите результат!
    .home__search
      search-panel(
        @request-completed="showResults"
        @on-error="showResults"
      )
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
          forksCount: String(this.$store.getters.forksCount),
          repo: String(this.$store.getters.repoName),
          owner: String(this.$store.getters.ownerLogin),
        },
      });
    },
  },
};
</script>
