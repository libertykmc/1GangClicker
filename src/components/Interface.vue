<script setup lang="ts">
import Icon from "./Icon.vue";
import { ref } from "vue";
const count = ref(0);
const energy = ref(200);
const isDead = ref(false);

const increment = () => {
  count.value++;
  energy.value -= 50;
  if (energy.value <= 0) {
    isDead.value = true;
  }
  if (energy.value> 0) isDead.value = false;
};
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
            <p class="stat__text">{{ count }}</p>
        </div>
        <div class="stat">
            <img class="stat__image" src="/Star.png" />
            <p class="stat__text">{{ energy }}</p>
        </div>
      </div>
      <div class="buttonholder">
        <button v-if="!isDead" @click="increment" class="button">
          <img src="../assets//images/people.png" alt="" class="button__img" />
        </button>
        <h1 v-if="isDead" class="dead">Жди сын шалавы, коплю стары</h1>
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
}

.app {
  width: 360px;
  height: 640px;
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
  padding-top: 150px;
}

.button {
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  background-color: transparent;
  cursor: pointer;
}

.dead {
  font-size: 24px;
  color: #fff;
  display: flex;
  justify-content: center;
}

.footerholder {
  margin-top: auto;
}

.footer {
  display: flex;
  justify-content: space-around;
  background: rgba(217, 217, 217, 1);
  border-radius: 48px;
  padding: 10px;
}
</style>
