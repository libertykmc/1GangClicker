<script setup lang="ts">
import type { Icon } from "../types";

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
  asya: "./Asya.png",
  german: "./german.png",
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

img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
</style>
