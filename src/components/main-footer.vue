<template>
  <footer class="footer">
    <div class="footer__container container">
      <div class="footer__logo">
        <router-link
          class="logo"
          :to="{name: 'Home'}"
        >
          Forks
        </router-link>
      </div>
      <a
        class="footer__copyright"
        href="mailto:aleksandr.azdakhov@gmail.com"
      >
        aleksandr.azdakhov@gmail.com
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "MainFooter",
};
</script>
