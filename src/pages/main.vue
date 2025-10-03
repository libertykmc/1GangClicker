<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Icon from "../components/Icon.vue";
import Button from "../components/Button.vue";
import { isDead, money, energy, avatar, checkAchievements } from "../main.ts";
import { watch } from "vue";

const increment = () => {
  money.value++;
  energy.value -= 20;
  if (energy.value <= 0) {
    isDead.value = true;
    energy.value = 0;
  }
  checkAchievements();
};

watch(money, (newCount) => {
  localStorage.setItem("money", newCount.toString());
});
</script>

<template>
  <div class="container">
    <div class="app">
      <Header />
      <div class="buttonholder">
        <Button v-if="!isDead" @click="increment"
          ><Icon :icon="avatar" />
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
