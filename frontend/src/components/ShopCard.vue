<script setup lang="ts">
import Icon, { Icon as IIcon } from "./Icon.vue";
import { money, avatar } from "../store";
import { ref, watch } from "vue";

const props = defineProps<{
  icon: IIcon;
  name: string;
  price: string;
}>();

const localPrice = ref(Number(props.price));
const haveMoney = ref(false);
const isPurchased = ref(false);

if (props.name === "miron") {
  isPurchased.value = localStorage.getItem("miron_purchased") === "true";
}

if (money.value >= localPrice.value && !isPurchased.value) {
  haveMoney.value = true;
}

const buyObject = () => {
  if (haveMoney.value) {
    money.value -= localPrice.value;
    localStorage.setItem("money", money.value.toString());

    if (props.name === "miron") {
      localStorage.setItem("profile_avatar", "miron");
      localStorage.setItem("miron_purchased", "true");
      avatar.value = "miron";
      isPurchased.value = true;
      haveMoney.value = false;
    }
  }
};

watch(money, (newCount) => {
  if (newCount < localPrice.value) {
    haveMoney.value = false;
  }
  localStorage.setItem("money", newCount.toString());
});

watch(
  () => props.price,
  (newCount) => {
    localPrice.value = Number(newCount);
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
  width: 30px;
  padding: 10px;
  border-radius: 10px;
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
