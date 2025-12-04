import { createApp } from "vue";
import "./assets/styles/index.css";
import App from "./App.vue";
import { createRouter, createMemoryHistory } from "vue-router";
import shop from "./pages/shop.vue";
import main from "./pages/main.vue";
import sign from "./components/Sign.vue";
import profile from "./pages/profile.vue";
import skins from "./pages/skins.vue";
import type { Icon } from "./types";
import login from "./pages/login.vue";
import register from "./pages/register.vue";
import { io, Socket } from "socket.io-client";
import { checkAuth, isAuthenticated } from "./authState";
import { money, energy, currentSkin, achievements, avatar } from "./store";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/welcome", component: sign },
    { path: "/login", component: login },
    { path: "/register", component: register },
    { path: "/main", component: main },
    { path: "/shop", component: shop },
    { path: "/profile", component: profile },
    { path: "/skins", component: skins },
  ],
});

let socket: Socket | null = null;

router.beforeEach(async (to, _from, next) => {
  await checkAuth();
  const isAuthed = isAuthenticated.value;

  if (isAuthed) {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Initialize socket if not already connected
      if (!socket) {
        const API_BASE =
          (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";
        socket = io(API_BASE, {
          query: { userId },
          withCredentials: true,
        });

        socket.on("playerUpdated", (player: any) => {
          if (player.money !== undefined) money.value = player.money;
          if (player.energy !== undefined) energy.value = player.energy;
          if (player.selectedSkin) {
            currentSkin.value = player.selectedSkin as Icon;
            localStorage.setItem("character_skin", player.selectedSkin);
          }
          // Сбрасываем все достижения перед загрузкой
          achievements.value.forEach((ach) => {
            ach.unlocked = false;
          });
          // Загружаем достижения только с бэкенда для текущего пользователя
          if (player.unlockedAchievements) {
            const unlockedIds = player.unlockedAchievements as string[];
            achievements.value.forEach((ach) => {
              if (unlockedIds.includes(ach.id)) {
                ach.unlocked = true;
              }
            });
          }
        });
      }

      // Fetch user data to get avatar and achievements
      try {
        const API_BASE =
          (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";
        const res = await fetch(`${API_BASE}/players/${userId}`);
        if (res.ok) {
          const player = await res.json();
          // Load character skin
          if (player.selectedSkin) {
            currentSkin.value = player.selectedSkin as Icon;
            localStorage.setItem("character_skin", player.selectedSkin);
          }
          // Load profile avatar
          if (player.user?.avatar) {
            avatar.value = player.user.avatar as Icon;
            localStorage.setItem("profile_avatar", player.user.avatar);
          }

          // Сбрасываем все достижения перед загрузкой
          achievements.value.forEach((ach) => {
            ach.unlocked = false;
          });
          // Загружаем достижения только с бэкенда для текущего пользователя
          if (player.unlockedAchievements) {
            const unlockedIds = player.unlockedAchievements as string[];
            achievements.value.forEach((ach) => {
              if (unlockedIds.includes(ach.id)) {
                ach.unlocked = true;
              }
            });
          }
        }
      } catch {}
    }
  } else {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }

  const publicPaths = new Set(["/login", "/register", "/welcome"]);
  if (isAuthed && publicPaths.has(to.path)) {
    return next("/main");
  }
  if (!isAuthed && !publicPaths.has(to.path)) {
    return next("/login");
  }
  return next();
});

createApp(App).use(router).mount("#app");
