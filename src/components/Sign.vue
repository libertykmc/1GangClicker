<script setup lang="ts">
import {useRouter} from "vue-router";
import Button from "./Button.vue"
import Icon from "./Icon.vue";
const router= useRouter();
const goToGame= () => {
  router.push("/main");
}
</script>

<template>
  <div class="container">
    <div class="app">
      <div class="sign">
      <h1>Добро пожаловать <br /> нажмите, чтобы войти</h1>
      <Button @click="goToGame"><Icon icon="sign" class="sign__img"/></Button>
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
}

.sign {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.sign__img {
  width: 50px;
}
</style>