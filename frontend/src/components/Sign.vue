<script setup lang="ts">
import {useRouter} from "vue-router";
import Button from "./Button.vue"

const router= useRouter();
const goToGame= () => {
  router.push("/main");
}
</script>

<template>
  <div class="container">
    <div class="app">
      <div class="sign">
        <h1>1Gang</h1>
      <h1>Добро пожаловать</h1>
      <Button @click="goToGame"><span class="button__text">Нажмите, чтобы войти</span></Button>
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
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.sign {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  color: #fff;
}

.button__text{ 
  font-size: 24px;
  color: #fff;
  font-family: "Inter", sans-serif;
}

</style>