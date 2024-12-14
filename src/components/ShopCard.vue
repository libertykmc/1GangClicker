<script setup lang="ts">
import Icon, {Icon as IIcon} from "./Icon.vue";
import {money} from "../main.ts";
import {ref, watch} from "vue";

const props = defineProps<{
    icon: IIcon,
    name: string,
    price: string;
}>();

const localPrice = ref(Number(props.price));
const haveMoney =ref(false);

if (money.value >= localPrice.value) {
  haveMoney.value = true;
}

const buyObject = () => {
  if (haveMoney) {
    money.value -= localPrice.value;
  }
}

watch(money, (newCount) => {
if (newCount < localPrice.value) {
  haveMoney.value = false;
  newCount = +localStorage.setItem("money", newCount.toString()); 
}

watch( () => props.price, (newCount) => {
    localPrice.value = Number(newCount);
})
});

</script>


<template>
    <div class="shop__card">
        <Icon class="card__image" :icon="icon" />
        <p class="card__text">{{ name }}</p>
        <p class="card__price">${{ price }}</p>
        <button @click="buyObject" v-if="haveMoney" class="greenButton">Купить</button>
        <button v-else class="grayButton">Купить</button>
    </div>
</template>


<style scoped>
.shop__card {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card__image {
  width: 30px;
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
  background-color: greenyellow;
  border-radius: 10px;
  border: none;
  padding: 5px;
  color: gray;
  font-size: 14px;
  cursor: pointer;
}

.grayButton {
  background-color: gray;
  border-radius: 10px;
  border: none;
  padding: 5px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
</style>