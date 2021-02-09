<template>
  <div class="table-wrapper">
    <table>
      <tr>
        <th>Название</th>
        <th>Владелец</th>
        <th>Кол-во звезд</th>
        <th>URL</th>
      </tr>
      <tr
        v-for="(item, $index) in data"
        :key="$index"
      >
        <td>
          <span>{{item.name}}</span>
        </td>
        <td>
          <span>{{item.owner}}</span>
        </td>
        <td>
          <span>{{item.stars}}</span>
        </td>
        <td>
          <span>{{item.url}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "results-table",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
