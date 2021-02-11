<template>
  <div id="app">
    <div class="page">
      <div class="page__header">
        <main-header></main-header>
      </div>
      <div class="page__main">
        <router-view></router-view>
      </div>
      <div class="page__footer">
        <main-footer></main-footer>
      </div>
    </div>
  </div>
</template>
<script>
import MainFooter from "@/components/main-footer";
import MainHeader from "@/components/main-header";
export default {
  components: {MainHeader, MainFooter},
};
</script>
