<script setup lang="ts">
import Header from "../components/Header.vue";
import Card from "../components/ShopCard.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="container">
    <div class="app">
      <div class="shop">
        <Header />
        <h1 class="shop__title">Магазин</h1>
        <div class="shop__items">
          <Card icon="micro" name="Микрофон" price="100" />
          <Card icon="micro" name="Микрофон" price="100" />
          <Card icon="micro" name="Микрофон" price="100" />
          <Card icon="miron" name="miron" price="10" />
        </div>
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

.shop {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.shop__title {
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
}

.shop__items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footerholder {
  margin-top: auto;
  padding: 20px;
}
</style>
