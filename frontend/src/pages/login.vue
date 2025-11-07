<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";

function decodeJwtPayload(token: string): any {
  try {
    const base64 = token.split(".")[1];
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

async function ensurePlayer(userId: string) {
  try {
    const res = await fetch(`${API_BASE}/players/${userId}`);
    if (res.ok) return;
    if (res.status === 404) {
      await fetch(`${API_BASE}/players/create/${userId}`, { method: "POST" });
    }
  } catch (e) {}
}

async function onSubmit() {
  loading.value = true;
  errorMessage.value = "";
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.message || "Ошибка входа");
    }
    const data = await res.json();
    const token = data?.access_token as string;
    if (!token) throw new Error("Токен не получен");
    localStorage.setItem("token", token);
    localStorage.setItem("username", data?.username || username.value);
    const payload = decodeJwtPayload(token);
    const userId = payload?.id as string;
    if (userId) localStorage.setItem("userId", userId);
    await ensurePlayer(userId);
    router.push("/main");
  } catch (e: any) {
    errorMessage.value = e?.message || "Не удалось выполнить вход";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <div class="auth">
      <h1>Вход</h1>
      <form @submit.prevent="onSubmit" class="form">
        <input v-model="username" type="text" placeholder="Логин" required />
        <input
          v-model="password"
          type="password"
          placeholder="Пароль"
          required
        />
        <button type="submit" :disabled="loading">
          {{ loading ? "Входим..." : "Войти" }}
        </button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p class="hint">
        Нет аккаунта?
        <router-link to="/register">Зарегистрируйтесь</router-link>
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
.hint a {
  color: #a6e1ff;
}
</style>
