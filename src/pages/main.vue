<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Icon from "../components/Icon.vue";
import Button from "../components/Button.vue";
import {isDead, money, energy} from "../main.ts";
import {watch} from "vue";

const increment = () => {
  money.value++;
  energy.value -= 20;
  if (energy.value <= 0) {
    isDead.value = true;
    energy.value = 0;
  }
};

watch(money, (newCount) => {
  localStorage.setItem("money", newCount.toString());
});
</script>


<template>
    <Header />
      <div class="buttonholder">
        <Button v-if="!isDead" @click="increment"><Icon icon="people" /> </Button>
        <h1 v-else class="dead">Коплю ману бро</h1>
      </div>
      <div class="footerholder">
        <Footer />
      </div>
</template>

<style scoped>
.buttonholder {
  display: flex;
  justify-content: center;
  flex: 1;
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