import { createApp } from "vue";
import "./assets/styles/index.css";
import App from "./App.vue";
import { createRouter, createMemoryHistory } from "vue-router";
import { ref } from "vue";
import shop from "./pages/shop.vue";
import main from "./pages/main.vue";
import sign from "./components/Sign.vue";
import profile from "./pages/profile.vue";

export const money = ref<number>(+(localStorage.getItem("money") || "0"));
export const energy = ref<number>(+(localStorage.getItem("energy") || "1000"));
export const isDead = ref(false);
// Инициализируем аватар по умолчанию если его нет
if (!localStorage.getItem("profile_avatar")) {
  localStorage.setItem("profile_avatar", "people");
}

export const avatar = ref<string>(
  localStorage.getItem("profile_avatar") || "people"
);

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/", component: sign },
    { path: "/main", component: main },
    { path: "/shop", component: shop },
    { path: "/profile", component: profile },
  ],
});

createApp(App).use(router).mount("#app");
