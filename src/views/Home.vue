<template>
  <div class="home">
    <h1>Home</h1>
    <search-panel>
    </search-panel>
  </div>
</template>

<script>
import SearchPanel from "@/components/search-panel";
export default {
  name: "Home",
  components: {SearchPanel},
};
</script>
