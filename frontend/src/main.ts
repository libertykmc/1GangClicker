import { createApp } from "vue";
import "./assets/styles/index.css";
import App from "./App.vue";
import { createRouter, createMemoryHistory } from "vue-router";
import { ref } from "vue";
import shop from "./pages/shop.vue";
import main from "./pages/main.vue";
import sign from "./components/Sign.vue";
import profile from "./pages/profile.vue";
import skins from "./pages/skins.vue";
import type { Icon } from "./components/Icon.vue";

export const money = ref<number>(+(localStorage.getItem("money") || "0"));
export const energy = ref<number>(+(localStorage.getItem("energy") || "1000"));
export const isDead = ref(false);
// Инициализируем аватар по умолчанию если его нет
if (!localStorage.getItem("profile_avatar")) {
  localStorage.setItem("profile_avatar", "people");
}

export const avatar = ref<Icon>(
  (localStorage.getItem("profile_avatar") as Icon) || "people"
);

// Система достижений
export interface Achievement {
  id: string;
  title: string;
  description: string;
  target: number;
  unlocked: boolean;
}

export const achievements = ref<Achievement[]>([
  {
    id: "earn_10",
    title: "Первые деньги",
    description: "Заработать 10$",
    target: 10,
    unlocked: JSON.parse(
      localStorage.getItem("achievement_earn_10") || "false"
    ),
  },
  {
    id: "earn_100",
    title: "Состоятельный",
    description: "Заработать 100$",
    target: 100,
    unlocked: JSON.parse(
      localStorage.getItem("achievement_earn_100") || "false"
    ),
  },
  {
    id: "earn_1000",
    title: "Миллионер",
    description: "Заработать 1,000$",
    target: 1000,
    unlocked: JSON.parse(
      localStorage.getItem("achievement_earn_1000") || "false"
    ),
  },
]);

// Функция проверки достижений
export function checkAchievements() {
  achievements.value.forEach((achievement) => {
    if (!achievement.unlocked && money.value >= achievement.target) {
      achievement.unlocked = true;
      localStorage.setItem(`achievement_${achievement.id}`, "true");
    }
  });
}

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/", component: sign },
    { path: "/main", component: main },
    { path: "/shop", component: shop },
    { path: "/profile", component: profile },
    { path: "/skins", component: skins },
  ],
});

createApp(App).use(router).mount("#app");
