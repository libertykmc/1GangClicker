<script setup lang="ts">
import Icon, {Icon as IIcon}  from "./Icon.vue";
defineProps<{
    icon: IIcon,
    text?:string,
}>();
</script>

<template>
    <div class="stat">
        <Icon :icon="icon" class="image"/>
        <p v-if="text" class="text">{{ text }}</p>
    </div>
</template>

<style scoped>
.stat {
  background-color: rgba(217, 217, 217, 1);
  border-radius: 48px;
 display: flex;
 align-items: center;
 justify-content: center;
}

.image {
  width: 30px;
  padding: 10px;
  height: 30px;
}

.text {
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: black;
  padding: 10px;
}
</style>