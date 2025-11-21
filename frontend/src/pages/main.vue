<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Icon from "../components/Icon.vue";
import Button from "../components/Button.vue";
import { isDead, money, energy, currentSkin, checkAchievements } from "../store";
import { watch, onMounted } from "vue";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";

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
    }
  } catch {}
});

const increment = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  energy.value = Math.max(0, energy.value - 10);
  try {
    const res = await fetch(`${API_BASE}/players/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        deltaMoney: 1,
        deltaEnergy: -10,
      }),
      credentials: "include",
    });
    if (res.ok) {
      const player = await res.json();
      money.value =
        typeof player.money === "number" ? player.money : money.value + 1;
    } else {
      money.value++;
    }
  } catch {
    money.value++;
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
  height: 100dhv;
  background-image: url("../assets/images/background.png");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.buttonholder {
  margin-top: 200px;
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
