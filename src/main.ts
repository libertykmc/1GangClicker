import { createApp } from "vue";
import "./assets/styles/index.css";
import App from "./App.vue";
import { createRouter, createMemoryHistory } from "vue-router";
import { ref } from "vue";
import shop from "./pages/shop.vue";
import main from "./pages/main.vue";
import sign  from "./components/Sign.vue";

export const money = ref<number>(+(localStorage.getItem("money") || "0"));
export const energy = ref<number>(+(localStorage.getItem("energy") || "1000"));
export const isDead = ref(false);

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {path: "/", component: sign},
        {path: "/main", component: main},
        { path: "/shop", component: shop },
    ],
})


createApp(App).use(router).mount("#app");
