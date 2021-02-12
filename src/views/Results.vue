<template>
  <div class="results-page container">
    <div
      class="results-page__preloader"
      v-show="showPreload"
    ></div>
    <div class="results-page__search">
      <search-panel
      :preset-value="searchValue"
      @on-error="showError"
      @request-completed="showResults"
      ></search-panel>
    </div>
    <div class="results-page__content results">
      <p
        v-if="!tableData.length"
        class="results__message"
        :class="{'error' : error}"
      >{{message}}</p>
      <div
        v-if="tableData.length"
        class="results__table"
      >
        <results-table :data="tableData"></results-table>
      </div>
      <div class="results__pagination">
        <paginate
          v-if="tableData.length && pageCount > 0"
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
      emptyMessage: "Ничего не найдено!",
      message: "",
      error: false,
      query: null,
    };
  },
  computed: {
    forks() {
      return this.$store.getters.forks;
    },
    favList() {
      return this.$store.getters.favList;
    },
    searchRequest() {
      return this.$store.getters.searchRequest;
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
      const missingQuery = requiredQueries.find((item) => !this.$route.query[item]);
      return !missingQuery;
    },
    async getData() {
      this.$store.commit("clearForks");
      try {
        await this.$store.dispatch("getForks", {
          owner: this.$route.query.owner,
          repo: this.$route.query.repo,
          page: this.$route.query.page,
          per_page: this.perPage,
        });
        this.showPreload = false;
      } catch (err) {
        this.error = true;
        this.message = `Ошибка: ${err.message}`;
        this.showPreload = false;
      }
    },
    async changePage(pageNumber) {
      this.showPreload = true;
      const query = {...this.$route.query};
      query.page = pageNumber;
      await this.$router.replace({query});
      await this.getData();
    },
    showError(err) {
      this.error = true;
      this.message = `Ошибка: ${err.message}`;
    },
    showResults() {
      this.error = false;
      this.message = this.emptyMessage;
      this.$router.replace({
        query: {
          page: 1,
          forksCount: String(this.$store.getters.forksCount),
          repo: String(this.$store.getters.repoName),
          owner: String(this.$store.getters.ownerLogin),
        },
      });
      this.pageCount = Math.ceil(this.$route.query.forksCount / this.perPage);
      this.pageNum = Number(this.$route.query.page);
      this.getData();
    },
  },
  created() {
    this.message = this.emptyMessage;
    if (this.checkQuery()) {
      this.pageCount = Math.ceil(this.$route.query.forksCount / this.perPage);
      this.searchValue = this.searchRequest;
      this.pageNum = Number(this.$route.query.page);
      this.getData();
    } else {
      this.$router.replace({query: null});
    }
  },
};
</script>
