<template lang="pug">
  .modal-wrapper
    .modal.shake
      h2.modal__title Ошибка!
      p.modal__text {{text}}
      button.modal__button(
      @click.prevent="$emit('on-close')"
      ) Закрыть
</template>

<script>
export default {
  name: "modal",
  props: {
    text: {
      type: String,
      default: "Неизвестная ошибка",
    },
  },
};
</script>
