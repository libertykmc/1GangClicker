<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Achievement from "../components/Achievement.vue";
import { ref } from "vue";
import { achievements } from "../main";

const name = ref<string>(localStorage.getItem("profile_name") || "Неизвестный");
const age = ref<number>(+(localStorage.getItem("profile_age") || 0));
const isEditing = ref<boolean>(false);

function toggleEdit() {
  if (isEditing.value) {
    localStorage.setItem("profile_name", name.value);
    localStorage.setItem("profile_age", String(age.value));
  }
  isEditing.value = !isEditing.value;
}

function onAvatarChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = String(reader.result || "");
    localStorage.setItem("profile_avatar", dataUrl);
    avatarSrc.value = dataUrl;
  };
  reader.readAsDataURL(input.files[0]);
}

const avatarSrc = ref<string>(
  localStorage.getItem("profile_avatar") || "/public/people.png"
);
</script>

<template>
  <div class="container">
    <div class="app">
      <Header />
      <div class="profile">
        <label class="avatar">
          <img :src="avatarSrc" alt="avatar" class="avatar__img" />
          <input
            v-if="isEditing"
            type="file"
            accept="image/*"
            class="avatar__input"
            @change="onAvatarChange"
          />
        </label>
        <div class="fields">
          <div class="field">
            <span class="label">Имя:</span>
            <span v-if="!isEditing" class="value">{{ name }}</span>
            <input v-else class="input" v-model="name" />
          </div>
          <div class="field">
            <span class="label">Возраст:</span>
            <span v-if="!isEditing" class="value">{{ age }}</span>
            <input
              v-else
              class="input"
              type="number"
              min="0"
              v-model.number="age"
            />
          </div>
          <button class="edit" @click="toggleEdit">
            {{ isEditing ? "Сохранить" : "Редактировать" }}
          </button>
        </div>
      </div>

      <div class="achievements">
        <h2 class="achievements__title">Достижения</h2>
        <div class="achievements__list">
          <Achievement
            v-for="achievement in achievements"
            :key="achievement.id"
            :title="achievement.title"
            :description="achievement.description"
            :is-unlocked="achievement.unlocked"
            icon="/Money.png"
          />
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

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
}

.avatar {
  position: relative;
  width: 120px;
  height: 120px;
}

.avatar__img {
  width: 120px;
  height: 120px;
  border-radius: 999px;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.7);
}

.avatar__input {
  position: absolute;
  bottom: 0;
  right: 0;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.field {
  display: flex;
  gap: 8px;
  align-items: center;
}

.label {
  color: #d0d0d0;
  font-size: 14px;
}

.value {
  color: #fff;
  font-size: 16px;
}

.input {
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
}

.edit {
  margin-top: 8px;
  padding: 8px 14px;
  border-radius: 12px;
  border: none;
}

.achievements {
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
}

.achievements__title {
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 15px 0;
  text-align: center;
}

.achievements__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footerholder {
  margin-top: auto;
  padding: 20px;
}
</style>
