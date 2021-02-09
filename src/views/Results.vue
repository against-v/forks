<template>
  <div class="results">
    <h1>Results</h1>
    <search-panel></search-panel>
    <div class="results">
      <div class="results__table">
        <results-table :data="tableData"></results-table>
      </div>
      <div class="results__pagination">
        <paginate
          :page-count="pageCount"
          :click-handler="changePage"
          :prev-text="'Предыдущая страница'"
          :next-text="'Следующая страница'"
          :container-class="'paginator'"
        ></paginate>
      </div>
    </div>

  </div>
</template>

<script>
import Paginate from "vuejs-paginate";
import SearchPanel from "@/components/search-panel";
import ResultsTable from "@/components/results-table";
export default {
  name: "Results",
  components: {ResultsTable, SearchPanel, Paginate},
  data() {
    return {
      perPage: 2,
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
    pageCount() {
      return Math.ceil(this.query.forksCount / this.perPage);
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
          per_page: this.perPage,
        });
      } catch (err) {
        console.error(err);
      }
    },
    async changePage(pageNumber) {
      const query = {...this.query};
      query.page = pageNumber;
      try {
        await this.$router.replace({query});
        await this.getData();
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    if (this.checkQuery()) {
      this.getData();
    } else {
      this.$router.replace({query: null});
    }
  },
};
</script>
