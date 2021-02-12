<template>
  <div class="results-page container">
    <div
      class="results-page__preloader"
      v-show="showPreload"
    ></div>
    <div class="results-page__search">
      <search-panel
      :preset-value="searchValue"
      ></search-panel>
    </div>
    <div class="results-page__content results">
      <div class="results__table">
        <results-table :data="tableData"></results-table>
      </div>
      <div class="results__pagination">
        <paginate
          v-if="pageCount > 0"
          v-model="pageNum"
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
      perPage: 10,
      pageCount: 0,
      pageNum: 1,
      searchValue: "",
      showPreload: true,
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
    forks() {
      return this.$store.getters.forks;
    },
    favList() {
      return this.$store.getters.favList;
    },
    tableData() {
      return this.forks.map((item) => {
        return {
          id: item.id,
          name: item.full_name,
          owner: item.owner.login,
          stars: item.stargazers_count,
          url: item.url,
          isFavorite: Boolean(this.favList.find(i => {
            return i === item.id;
          })),
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
        this.showPreload = false;
      } catch (err) {
        console.error(err);
        this.showPreload = false;
      }
    },
    async changePage(pageNumber) {
      this.showPreload = true;
      this.$store.commit("clearForks");
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
      this.pageCount = Math.ceil(this.query.forksCount / this.perPage);
      this.searchValue = `${this.query.owner}/${this.query.repo}`;
      this.pageNum = Number(this.query.page);
      this.getData();
    } else {
      this.$router.replace({query: null});
    }
  },
};
</script>
