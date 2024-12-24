<script setup lang="ts">
import Stat from "./Stat.vue";
import { onMounted, onUnmounted, watch } from "vue";
import { money, energy, isDead } from "../main.ts";

let energyTimer: number | null = null;

const restoreEnergy = () => {
  if (energy.value < 1000) {
    energy.value += 10;
    if (energy.value > 1000) {
      energy.value = 1000;
    }
  }
};

const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

onMounted(() => {
  energyTimer = setInterval(restoreEnergy, 1000);
});

onUnmounted(() => {
  if (energyTimer != null) {
    clearInterval(energyTimer);
  }
});

watch(money, (newCount) => {
  localStorage.setItem("money", newCount.toString());
});

watch(energy, (newCount) => {
  if (newCount > 0) isDead.value = false;
  localStorage.setItem("energy", newCount.toString());
});
</script>

<template>
  <div class="high__stats">
    <RouterLink to="/main"><Stat icon="home" /></RouterLink>
    <Stat icon="money" :text="formatNumber(money.valueOf())" />
    <Stat icon="star" :text="energy.toString()" />
  </div>
</template>

<style scoped>
.high__stats {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  gap: 10px;
}

.stat__image {
  width: 30px;
  padding: 10px;
  height: 30px;
}

.stat__text {
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: black;
  padding: 10px;
}
</style>
