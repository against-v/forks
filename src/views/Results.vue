<template>
  <div class="results">
    <h1>Results</h1>
    <search-panel>
    </search-panel>
    <results-table
      :data="tableData"
    ></results-table>
  </div>
</template>

<script>
import SearchPanel from "@/components/search-panel";
import ResultsTable from "@/components/results-table";
export default {
  name: "Results",
  components: {ResultsTable, SearchPanel},
  computed: {
    query() {
      return this.$route.query;
    },
    forks() {
      return this.$store.getters.forks;
    },
    tableData() {
      return this.forks.map((item) => {
        return {
          name: item.full_name,
          owner: item.owner.login,
          stars: item.stargazers_count,
          url: item.url,
        };
      });
    },
  },
  methods: {
    checkQuery() {
      const requiredQueries = [
        "forksCount",
        "owner",
        "page",
        "repo",
      ];
      const missingQuery = requiredQueries.find((item) => !this.query[item]);
      return !missingQuery;
    },
    async getData() {
      try {
        await this.$store.dispatch("getForks", {
          owner: this.query.owner,
          repo: this.query.repo,
          page: this.query.page,
          per_page: 10,
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
  created() {
    if (this.checkQuery()) {
      this.getData();
    } else {
      this.$router.replace({"query": null});
    }
  },
};
</script>
