<template lang="pug">
  #app
    .page
      .page__header
        main-header
      .page__main
        router-view
      .page__footer
        main-footer
</template>
<script>
import MainFooter from "@/components/main-footer";
import MainHeader from "@/components/main-header";
export default {
  components: {MainHeader, MainFooter},
};
</script>
