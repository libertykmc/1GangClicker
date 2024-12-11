<script setup lang="ts">
type Icon = "home" | "money" | "star" | "shirt" | "micro" | "disk" | "people";

defineProps<{
  icon: Icon;
}>();

const iconPaths: Record<Icon, string> = {
  home: "./Home.png",
  money: "./Money.png",
  star: "./Star.png",
  shirt: "./Shirt.png",
  micro: "./Micro.png",
  disk: "./Disk.png",
  people: "./people.png"
};
</script>

<template>
  <img :src="iconPaths[icon]" />
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
</style>
