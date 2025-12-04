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
        <h1 class="shop__title">Усилители</h1>
        <div class="shop__items">
          <Card icon="shirt" name="Денежная футболка" price="100" />
          <Card icon="disk" name="Энергетический диск" price="200" />
          <h1 class="shop__title" style="text-align: center">Скины</h1>
          <Card icon="miron" name="Стартовый Мирон" price="10" />
          <Card icon="asya" name="Красавица Ася" price="500" />
          <Card icon="german" name="Легендарный Герман" price="1000" />
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
