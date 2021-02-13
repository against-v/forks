<template lang="pug">
  .home.container
    .home__title
      h1.title Поиск форков у репозитория
      p.subtitle Введите в поисковую строку название репозитория в формате <b>:owner/:repositoryName</b>, нажмите поиск и получите результат!
    .home__search
      search-panel(
        @on-search="showResults"
      )
</template>

<script>
import SearchPanel from "@/components/search-panel";
export default {
  name: "Home",
  components: {SearchPanel},
  methods: {
    showResults(owner, repo) {
      this.$router.push({
        name: "Results",
        query: {
          owner: owner,
          repo: repo,
        },
      });
    },
  },
};
</script>
