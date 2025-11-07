<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { avatar } from "../main";
import { ref } from "vue";
import type { Icon } from "../components/Icon.vue";

// Список доступных скинов
const availableSkins = [
  { id: "people", name: "People", icon: "people" },
  { id: "miron", name: "Miron", icon: "miron" },
];

// Выбранный скин
const selectedSkin = ref<Icon>(avatar.value);

// Функция выбора скина
const selectSkin = (skinId: string) => {
  selectedSkin.value = skinId as Icon;
  avatar.value = skinId as Icon;
  localStorage.setItem("profile_avatar", skinId);
};
</script>

<template>
  <div class="container">
    <div class="app">
      <div class="skins">
        <Header />
        <h1 class="skins__title">Скины</h1>

        <div class="skins__grid">
          <div
            v-for="skin in availableSkins"
            :key="skin.id"
            class="skin-card"
            :class="{ 'skin-card--selected': selectedSkin === skin.id }"
            @click="selectSkin(skin.id)"
          >
            <div class="skin-card__preview">
              <img
                :src="`/${skin.icon}.png`"
                :alt="skin.name"
                class="skin-card__image"
              />
            </div>
            <h3 class="skin-card__name">{{ skin.name }}</h3>
            <div v-if="selectedSkin === skin.id" class="skin-card__selected">
              Выбрано
            </div>
          </div>
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
  background-image: url("../assets/images/background.png");
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

.skins {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.skins__title {
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
}

.skins__grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.skin-card {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  min-width: 150px;
}

.skin-card:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.skin-card--selected {
  border-color: #4caf50;
  background: rgba(76, 175, 80, 0.2);
}

.skin-card__preview {
  width: 80px;
  height: 80px;
  margin: 0 auto 10px;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
}

.skin-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.skin-card__name {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin: 0 0 5px;
}

.skin-card__selected {
  font-family: "Inter", sans-serif;
  font-size: 12px;
  color: #4caf50;
  font-weight: 600;
}

.footerholder {
  margin-top: auto;
  padding: 20px;
}
</style>
