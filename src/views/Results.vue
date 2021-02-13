<template lang="pug">
  .results.container
    .results__preloader(
      v-show="showPreload"
    )
    .results__search
      search-panel(
        :preset-value="searchValue"
        @on-search="onSearch"
      )
    .results__content
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
        v-model="pageNum"
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
import {DEFAULT_PAGE_NUM, PER_PAGE} from "@/const";

export default {
  name: "Results",
  components: {ResultsTable, SearchPanel, Paginate},
  data() {
    return {
      pageNum: 1,
      searchValue: "",
      showPreload: true,
      emptyMessage: "Ничего не найдено!",
    };
  },
  computed: {
    owner() {
      return this.$route.query.owner;
    },
    repo() {
      return this.$route.query.repo;
    },
    forksCount() {
      return this.$store.getters.forksCount;
    },
    pageCount() {
      return this.forksCount / PER_PAGE;
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
    async getRepo() {
      try {
        await this.$store.dispatch("getRepo", {
          owner: this.owner,
          repo: this.repo,
        });
        if (this.forksCount) {
          await this.getForks();
        } else {
          this.$store.commit("clearForks");
          this.showPreload = false;
        }
      } catch (err) {
        console.log(11);
        console.log(err);
      }
    },
    async getForks(pageNum = DEFAULT_PAGE_NUM) {
      try {
        const query = {...this.$route.query};
        if (query.page) {
          pageNum = query.page;
        } else {
          query.page = pageNum;
          await this.$router.replace({query});
        }

        await this.$store.dispatch("getForks", {
          owner: this.owner,
          repo: this.repo,
          page: pageNum,
          per_page: PER_PAGE,
        });
        this.showPreload = false;
      } catch (err) {
        console.log(22);
        console.log(err);
      }
    },
    async onSearch(owner, repo) {
      await this.$router.replace({
        query: {
          owner,
          repo,
        },
      });
      await this.getRepo();
    },
    async changePage(pageNumber) {
      this.showPreload = true;
      await this.getForks(pageNumber);
    },

  },
  created() {
    this.searchValue = this.setSearchValue();
    this.getRepo();
  },
};
</script>
