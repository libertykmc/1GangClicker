<script setup lang="ts">
import Icon from "./Icon.vue";
</script>

<template>
<footer class="footer">
    <RouterLink to="/shop"><Icon class="footer__image" icon="shirt" /></RouterLink>
     <Icon class="footer__image" icon="micro" />
     <Icon class="footer__image" icon="disk" />
   </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-around;
  background: rgba(217, 217, 217, 1);
  border-radius: 48px;
  padding: 10px;
  gap: 30px;
}
.footer__image {
  width: 30px;
  padding: 10px;
  height: 30px;
}
</style>