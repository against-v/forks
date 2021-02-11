<template>
  <header class="header">
    <div class="header__container container">
      <div class="header__logo">
        <router-link
          class="logo"
          :to="{name: 'Home'}"
        >
          Forks
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
};
</script>
