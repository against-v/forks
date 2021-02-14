<template lang="pug">
  .table-wrapper
    table.table
      tr.table__tr
        th.table__th Название
        th.table__th Владелец
        th.table__th Кол-во звезд
        th.table__th Ссылка
        th.table__th Избранное
      tr.table__tr(
        v-for="(item, $index) in data"
        :key="$index"
      )
        td.table__td
          span {{item.name}}
        td.table__td
          span {{item.owner}}
        td.table__td
          span {{item.stars}}
        td.table__td
          a.table__link(
            :href="item.url"
          ) {{item.name}}
        td.table__td
          button-fav(
            :id="item.id"
            :preset-value="item.isFavorite"
            @change="onFavoriteChange"
          )

</template>

<script>
import ButtonFav from "@/components/button-fav";
export default {
  name: "results-table",
  components: {ButtonFav},
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onFavoriteChange(id, value) {
      if (value) {
        this.$store.dispatch("addToFavList", id);
      } else {
        this.$store.dispatch("removeFromFavList", id);
      }
    },
  },
};
</script>
