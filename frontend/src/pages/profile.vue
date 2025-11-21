<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Achievement from "../components/Achievement.vue";
import { ref, onMounted } from "vue";
import { achievements } from "../store";
import { useRouter } from "vue-router";
import { checkAuth } from "../authState";

const router = useRouter();

const name = ref<string>(localStorage.getItem("profile_name") || "Неизвестный");
const age = ref<number>(+(localStorage.getItem("profile_age") || 0));
const isEditing = ref<boolean>(false);
const pendingAvatar = ref<string | null>(null);
const isSaving = ref<boolean>(false);

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";

function calcAgeFromBirthDate(dateStr: string): number {
  const parts = dateStr.split(".");
  if (parts.length !== 3) return 0;
  const [dd, mm, yyyy] = parts.map((p) => parseInt(p, 10));
  if (!yyyy || !mm || !dd) return 0;
  const birth = new Date(yyyy, mm - 1, dd);
  const now = new Date();
  let a = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) a--;
  return a;
}

const avatarSrc = ref<string>(
  localStorage.getItem("profile_avatar") || "/public/people.png"
);

onMounted(async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return;
  try {
    const res = await fetch(`${API_BASE}/players/${userId}`);
    if (!res.ok) return;
    const player = await res.json();
    const fullName = player?.user?.fullName as string | undefined;
    const birthDate = player?.user?.birthDate as string | undefined;
    const avatar = player?.user?.avatar as string | undefined;
    if (fullName) {
      name.value = fullName;
      localStorage.setItem("profile_name", fullName);
    }
    if (birthDate) {
      const computedAge = calcAgeFromBirthDate(birthDate);
      age.value = computedAge;
      localStorage.setItem("profile_age", String(computedAge));
    }
    if (avatar) {
      avatarSrc.value = avatar;
      localStorage.setItem("profile_avatar", avatar);
    }
  } catch {}
});

function toggleEdit() {
  if (!isEditing.value) {
    isEditing.value = true;
    pendingAvatar.value = null;
    return;
  }

  saveChanges();
}

async function saveChanges() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    isEditing.value = false;
    pendingAvatar.value = null;
    return;
  }
  try {
    isSaving.value = true;
    if (pendingAvatar.value) {
      const res = await fetch(`${API_BASE}/auth/avatar/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: pendingAvatar.value }),
        credentials: "include",
      });
      if (res.ok) {
        const { avatar } = await res.json();
        avatarSrc.value = avatar || pendingAvatar.value;
        localStorage.setItem("profile_avatar", avatarSrc.value);
      }
    }
  } catch {
  } finally {
    isSaving.value = false;
    isEditing.value = false;
    pendingAvatar.value = null;
  }
}

function onAvatarChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = String(reader.result || "");

    avatarSrc.value = dataUrl;
    pendingAvatar.value = dataUrl;
  };
  reader.readAsDataURL(file);
}

async function logout() {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  } catch {}
  localStorage.removeItem("userId");
  localStorage.removeItem("profile_name");
  localStorage.removeItem("profile_age");
  localStorage.removeItem("profile_avatar");

  await checkAuth(true);
  router.push("/login");
}
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
            <span class="label">ФИО:</span>
            <span class="value">{{ name }}</span>
          </div>
          <div class="field">
            <span class="label">Возраст:</span>
            <span class="value">{{ age }}</span>
          </div>
          <button class="edit" :disabled="isSaving" @click="toggleEdit">
            {{
              isEditing
                ? isSaving
                  ? "Сохраняем..."
                  : "Сохранить"
                : "Редактировать"
            }}
          </button>
          <button class="edit" @click="logout">Выйти</button>
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
