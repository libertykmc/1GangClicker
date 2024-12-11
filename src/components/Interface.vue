<script setup lang="ts">
import Icon from "./Icon.vue";
import { ref, onMounted, onUnmounted, watch } from "vue";
import Button from "./Button.vue"

const money = ref<number>(parseInt(localStorage.getItem("money") || "0"));
const energy = ref(200);
const isDead = ref(false);
let energyTimer: number | null = null;

const increment = () => {
  money.value++;
  energy.value -= 20;
  if (energy.value <= 0) {
    isDead.value = true;
    energy.value = 0;
  }
  else isDead.value = false;
};

const restoreEnergy = () => {
  if (energy.value < 200) {
    energy.value +=10;
    if (energy.value > 200) {
      energy.value = 200;
    }
  }
};


onMounted(() => {
  energyTimer = setInterval(restoreEnergy, 2000);
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
})
</script>

<template>
  <div class="container">
    <div class="app">
      <div class="high__stats">
        <div class="stat">
            <img class="stat__image" src="/Home.png" />
        </div>
        <div class="stat">
            <img class="stat__image" src="/Money.png" />
            <p class="stat__text">{{ money }}</p>
        </div>
        <div class="stat">
            <img class="stat__image" src="/Star.png" />
            <p class="stat__text">{{ energy }}</p>
        </div>
      </div>
      <div class="buttonholder">
        <Button v-if="!isDead" @click="increment"><Icon icon="people" /> </Button>
        <h1 v-else class="dead">I haven't fame</h1>
      </div>
      <div class="footerholder">
        <footer class="footer">
          <Icon icon="shirt" />
          <Icon icon="micro" />
          <Icon icon="disk" />
        </footer>
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
}

.app {
  max-width: 480px;
  background-image: url("../assets/images/background.png");
  background-size: auto 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.high__stats {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  gap: 20px;
}

.stat {
    background-color: rgba(217, 217, 217, 1);
  border-radius: 48px;
  display: flex;
  gap: 3px;
  align-items: center;
}

.stat__image {
    width: 50px;
  padding: 7px;
}

.stat__text {
    font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 400;
  color: black;
  padding: 5px;
}

.buttonholder {
  display: flex;
  justify-content: center;
  padding-top: 200px;
}

.dead {
  font-size: 24px;
  color: #fff;
  display: flex;
  justify-content: center;
}

.footerholder {
  margin-top: 20px;
}

.footer {
  display: flex;
  justify-content: space-around;
  background: rgba(217, 217, 217, 1);
  border-radius: 48px;
  padding: 10px;
}
</style>
