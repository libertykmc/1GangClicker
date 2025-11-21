<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const fullName = ref("");
const birthDate = ref(""); // DD.MM.YYYY
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";

function isValidDate(date: string) {
  return /^\d{2}\.\d{2}\.\d{4}$/.test(date);
}

async function onSubmit() {
  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";
  try {
    if (!isValidDate(birthDate.value)) {
      throw new Error("Дата должна быть в формате ДД.ММ.ГГГГ");
    }
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        fullName: fullName.value,
        birthDate: birthDate.value,
      }),
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.message || "Ошибка регистрации");
    }
    successMessage.value = "Регистрация успешна. Теперь войдите.";
    setTimeout(() => router.push("/login"), 800);
  } catch (e: any) {
    errorMessage.value = e?.message || "Не удалось зарегистрироваться";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <div class="auth">
      <h1>Регистрация</h1>
      <form @submit.prevent="onSubmit" class="form">
        <input v-model="fullName" type="text" placeholder="ФИО" required />
        <input v-model="username" type="text" placeholder="Логин" required />
        <input
          v-model="password"
          type="password"
          placeholder="Пароль"
          required
        />
        <input
          v-model="birthDate"
          type="text"
          placeholder="ДД.ММ.ГГГГ"
          required
        />
        <button type="submit" :disabled="loading">
          {{ loading ? "Регистрируем..." : "Зарегистрироваться" }}
        </button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p class="hint">
        Уже есть аккаунт? <router-link to="/login">Войти</router-link>
      </p>
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
.auth {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  color: #fff;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 280px;
}
input,
button {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
}
button {
  cursor: pointer;
}
.error {
  color: #ff6b6b;
}
.success {
  color: #7cfc00;
}
.hint a {
  color: #a6e1ff;
}
</style>
