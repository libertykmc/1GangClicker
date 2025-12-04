<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Icon from "../components/Icon.vue";
import Button from "../components/Button.vue";
import {
  isDead,
  money,
  energy,
  currentSkin,
  checkAchievements,
} from "../store";
import { watch, onMounted, ref } from "vue";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";

const clickPower = ref(1);
const energyPerClick = ref(5);

onMounted(async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    window.location.href = "#/login";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/players/${userId}`);
    if (res.ok) {
      const player = await res.json();
      if (typeof player.money === "number") money.value = player.money;
      if (typeof player.energy === "number") energy.value = player.energy;
      if (typeof player.clickPower === "number")
        clickPower.value = player.clickPower;
      if (typeof player.energyPerClick === "number")
        energyPerClick.value = player.energyPerClick;
    }
  } catch {}
});

const increment = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  const energyCost = energyPerClick.value;
  if (energy.value < energyCost) return;

  energy.value = Math.max(0, energy.value - energyCost);
  try {
    const res = await fetch(`${API_BASE}/players/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        deltaMoney: clickPower.value,
        deltaEnergy: -energyCost,
      }),
      credentials: "include",
    });
    if (res.ok) {
      const player = await res.json();
      money.value =
        typeof player.money === "number"
          ? player.money
          : money.value + clickPower.value;
      if (typeof player.energy === "number") {
        energy.value = player.energy;
      }
      if (typeof player.clickPower === "number") {
        clickPower.value = player.clickPower;
      }
      if (typeof player.energyPerClick === "number") {
        energyPerClick.value = player.energyPerClick;
      }
    } else {
      money.value += clickPower.value;
    }
  } catch {
    money.value += clickPower.value;
  }
  checkAchievements();
};

watch(money, (newCount) => {
  localStorage.setItem("money", newCount.toString());
});

watch(energy, (newVal) => {
  localStorage.setItem("energy", newVal.toString());
});
</script>

<template>
  <div class="container">
    <div class="app">
      <Header />
      <div class="buttonholder">
        <Button v-if="!isDead" @click="increment"
          ><Icon :icon="currentSkin" />
        </Button>
        <h1 v-else class="dead">Коплю ману бро</h1>
      </div>
      <div class="footerholder">
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/images//background.png");
  min-height: 100dvh;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.app {
  flex: 1;
  width: 100%;
  height: 100dvh;
  max-height: 100dvh;
  background-image: url("../assets/images/background.png");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

.buttonholder {
  margin-top: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  max-height: 75vh;
  overflow: hidden;
  flex-shrink: 1;
  flex-grow: 1;
}

.buttonholder :deep(img) {
  max-width: min(400px, 70vw);
  max-height: min(600px, 75vh);
  width: auto;
  height: auto;
  object-fit: contain;
}

.dead {
  font-size: 18px;
  color: #fff;
  text-align: center;
}

.footerholder {
  margin-top: auto;
  padding: 20px;
}
</style>
