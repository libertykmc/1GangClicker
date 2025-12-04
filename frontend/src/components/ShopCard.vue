<script setup lang="ts">
import Icon from "./Icon.vue";
import type { Icon as IIcon } from "../types";
import { money } from "../store";
import { ref, watch, onMounted } from "vue";

const props = defineProps<{
  icon: IIcon;
  name: string;
  price: string;
}>();

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";

const localPrice = ref(Number(props.price));
const haveMoney = ref(false);
const isPurchased = ref(false);

// Определяем, является ли товар скином
const isSkin = ["miron", "asya", "german"].includes(props.icon);
const itemId = props.icon; // Используем icon как itemId

// Маппинг названий товаров на itemId
const itemIdMap: Record<string, string> = {
  "Денежная футболка": "shirt",
  "Энергетический диск": "disk",
  "Стартовый Мирон": "miron",
  "Красавица Ася": "asya",
  "Легендарный Герман": "german",
};

const getItemId = () => {
  return itemIdMap[props.name] || itemId;
};

onMounted(async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  try {
    const res = await fetch(`${API_BASE}/players/${userId}`);
    if (res.ok) {
      const player = await res.json();
      const currentItemId = getItemId();

      if (isSkin) {
        // Проверяем ownedSkins
        if (player.ownedSkins && player.ownedSkins.includes(currentItemId)) {
          isPurchased.value = true;
        }
      } else {
        // Проверяем purchasedItems
        if (
          player.purchasedItems &&
          player.purchasedItems.includes(currentItemId)
        ) {
          isPurchased.value = true;
        }
      }
    }
  } catch {}

  updateHaveMoney();
});

const updateHaveMoney = () => {
  if (money.value >= localPrice.value && !isPurchased.value) {
    haveMoney.value = true;
  } else {
    haveMoney.value = false;
  }
};

const buyObject = async () => {
  if (!haveMoney.value || isPurchased.value) return;

  const userId = localStorage.getItem("userId");
  if (!userId) return;

  const currentItemId = getItemId();

  try {
    if (isSkin) {
      // Покупка скина
      const res = await fetch(`${API_BASE}/players/purchase/skin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          skinId: currentItemId,
          price: localPrice.value,
        }),
        credentials: "include",
      });

      if (res.ok) {
        const player = await res.json();
        money.value = player.money;
        isPurchased.value = true;
        haveMoney.value = false;
      }
    } else {
      // Покупка товара
      const res = await fetch(`${API_BASE}/players/purchase/item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          itemId: currentItemId,
          price: localPrice.value,
        }),
        credentials: "include",
      });

      if (res.ok) {
        const player = await res.json();
        money.value = player.money;
        isPurchased.value = true;
        haveMoney.value = false;
      }
    }
  } catch (error) {
    console.error("Purchase error:", error);
  }
};

watch(money, () => {
  updateHaveMoney();
});

watch(
  () => props.price,
  (newCount) => {
    localPrice.value = Number(newCount);
    updateHaveMoney();
  }
);
</script>

<template>
  <div class="shop__card">
    <Icon class="card__image" :icon="icon" />
    <p class="card__text">{{ name }}</p>
    <p class="card__price">${{ price }}</p>
    <button
      @click="buyObject"
      v-if="haveMoney && !isPurchased"
      class="greenButton"
    >
      Купить
    </button>
    <button v-else-if="isPurchased" class="purchasedButton" disabled>
      Приобретено
    </button>
    <button v-else class="grayButton">Купить</button>
  </div>
</template>

<style scoped>
.shop__card {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgb(71, 69, 69);
  border-radius: 30px;
  padding: 10px;
}

.card__image {
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
}

.card__image :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card__text {
  font-family: "Inter", sans-serif;
  color: #fff;
  font-size: 16px;
}

.card__price {
  font-family: "Inter", sans-serif;
  color: greenyellow;
  font-size: 14px;
}

.greenButton {
  background-color: rgb(106, 169, 12);
  border-radius: 10px;
  border: none;
  padding: 5px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin-left: auto;
}

.grayButton {
  background-color: gray;
  border-radius: 10px;
  border: none;
  padding: 5px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin-left: auto;
}

.purchasedButton {
  background-color: #4a5568;
  border-radius: 10px;
  border: none;
  padding: 5px;
  color: #a0aec0;
  font-size: 14px;
  cursor: not-allowed;
  margin-left: auto;
  opacity: 0.7;
}
</style>
