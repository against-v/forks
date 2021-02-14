<template lang="pug">
  .results.container
    modal(
    v-if="showError"
    :text="errorText"
    @on-close="showError = false"
    )
    .results__search
      search-panel(
        :preset-value="searchValue"
        @on-search="onSearch"
      )
    .results__content
      .results__preloader(
        v-show="showPreload"
      )
      .results__table(
        v-if="tableData.length"
      )
        results-table(
          :data="tableData"
        )
      p.results__message(
        v-else
      ) Ничего не найдено!

    .results__pagination(
      v-if="tableData.length && pageCount > 1"
    )
      paginate(
        v-model="paginatorValue"
        :page-count="pageCount"
        :click-handler="changePage"
        :prev-text="'Предыдущая страница'"
        :next-text="'Следующая страница'"
        :container-class="'paginator'"
      )
</template>

<script>
import Paginate from "vuejs-paginate";
import SearchPanel from "@/components/search-panel";
import ResultsTable from "@/components/results-table";
import {DEFAULT_PAGE_NUM, PER_PAGE, Error} from "@/const";
import Modal from "@/components/modal";

export default {
  name: "Results",
  components: {Modal, ResultsTable, SearchPanel, Paginate},
  data() {
    return {
      paginatorValue: DEFAULT_PAGE_NUM,
      searchValue: "",
      showPreload: true,
      emptyMessage: "Ничего не найдено!",
      showError: false,
      errorText: Error.DEFAULT,
    };
  },
  computed: {
    owner() {
      return this.$route.query.owner;
    },
    repo() {
      return this.$route.query.repo;
    },
    page() {
      return this.$route.query.page || String(DEFAULT_PAGE_NUM);
    },
    forksCount() {
      return this.$store.getters.forksCount;
    },
    pageCount() {
      return Math.ceil(this.forksCount / PER_PAGE);
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
    setSearchValue() {
      const query = this.$route.query;
      if (query.owner && query.repo) {
        return `${query.owner}/${query.repo}`;
      }
      return "";
    },
    onError(err) {
      const status = err.response.status;
      if (status === 404) {
        this.errorText = Error.NOT_FOUND;
      } else if (status === 403) {
        this.errorText = Error.LIMIT;
      } else {
        this.errorText = Error.DEFAULT;
      }
      this.showError = true;
    },
    async getRepo() {
      try {
        await this.$store.dispatch("getRepo", {
          owner: this.owner,
          repo: this.repo,
          type: "public",
        });
        if (this.forksCount) {
          this.paginatorValue = Number(this.page);
          await this.getForks(this.page);
        } else {
          this.$store.commit("clearForks");
          this.showPreload = false;
        }
      } catch (err) {
        this.showPreload = false;
        this.onError(err);
      }
    },
    async getForks(page) {
      page = String(page);
      const query = {...this.$route.query};
      if (query.page !== page) {
        query.page = page;
        await this.$router.replace({query});
      }
      this.$store.commit("clearForks");
      try {
        await this.$store.dispatch("getForks", {
          owner: this.owner,
          repo: this.repo,
          page: page,
          per_page: PER_PAGE,
        });
        this.showPreload = false;
      } catch (err) {
        this.showPreload = false;
        this.onError(err);
      }
    },
    async onSearch(owner, repo) {
      this.showPreload = true;
      await this.$router.replace({
        query: {
          owner,
          repo,
        },
      });
      await this.getRepo();
    },
    async changePage(page) {
      this.showPreload = true;
      await this.getForks(page);
    },

  },
  created() {
    this.searchValue = this.setSearchValue();
    this.getRepo();
  },
};
</script>
