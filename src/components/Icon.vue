<script setup lang="ts">
export type Icon =
  | "home"
  | "money"
  | "star"
  | "shirt"
  | "micro"
  | "disk"
  | "people"
  | "sign"
  | "vika"
  | "ishak"
  | "miron";

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
  people: "./people.png",
  sign: "./sign.svg",
  vika: "./Vika.jpg",
  ishak: "./ishak.jpg",
  miron: "./miron.png",
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
