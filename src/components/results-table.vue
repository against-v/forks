<template>
  <div class="table-wrapper">
    <table class="table">
      <tr class="table__tr">
        <th class="table__th">Название</th>
        <th class="table__th">Владелец</th>
        <th class="table__th">Кол-во звезд</th>
        <th class="table__th">Ссылка</th>
        <th class="table__th">Избранное</th>
      </tr>
      <tr
        class="table__tr"
        v-for="(item, $index) in data"
        :key="$index"
      >
        <td class="table__td">
          <span>{{item.name}}</span>
        </td>
        <td class="table__td">
          <span>{{item.owner}}</span>
        </td>
        <td class="table__td">
          <span>{{item.stars}}</span>
        </td>
        <td class="table__td">
          <a
            class="table__link"
            :href="item.url"
          >
            {{item.name}}
          </a>
        </td>
        <td class="table__td">
          <button-fav
            :id="item.id"
            :preset-value="item.isFavorite"
            @change="onFavoriteChange"
          ></button-fav>
        </td>
      </tr>
    </table>
  </div>
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
