<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import Button from "./Button.vue"
import Icon from "./Icon.vue";

const money = ref<number>(+(localStorage.getItem("money") || "0"));
const energy = ref<number>(+(localStorage.getItem("energy") || "200"));
const isDead = ref(false);
let energyTimer: number | null = null;

const increment = () => {
  money.value++;
  energy.value -= 20;
  if (energy.value <= 0) {
    isDead.value = true;
    energy.value = 0;
  }
};

const restoreEnergy = () => {
  if (energy.value < 200) {
    energy.value +=10;
    if (energy.value > 200) {
      energy.value = 200;
    }
  }
};


onMounted(() => {
  energyTimer = setInterval(restoreEnergy, 1000);
});

onUnmounted(() => {
  if (energyTimer != null) {
    clearInterval(energyTimer);
  }
});

watch(money, (newCount) => {
  localStorage.setItem("money", newCount.toString());
});

watch(energy, (newCount) => {
  if (newCount > 0) isDead.value = false;
  localStorage.setItem("energy", newCount.toString());
})
</script>

<template>
  <div class="container">
    <div class="app">
      <div class="high__stats">
        <div class="stat">
             <Icon class=stat__image icon="home" />
        </div>
        <div class="stat">
          <Icon class=stat__image icon="money" />
            <p class="stat__text">{{ money }}</p>
        </div>
        <div class="stat">
          <Icon class=stat__image icon="star" />
            <p class="stat__text">{{ energy }}</p>
        </div>
      </div>
      <div class="buttonholder">
        <Button v-if="!isDead" @click="increment"><Icon icon="people" /> </Button>
        <h1 v-else class="dead">Коплю ману бро</h1>
      </div>
      <div class="footerholder">
        <footer class="footer">
          <Icon class="stat__image" icon="shirt" />
          <Icon class="stat__image" icon="micro" />
          <Icon class="stat__image" icon="disk" />
        </footer>
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
}

.high__stats {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  gap: 10px;
}

.stat {
  background-color: rgba(217, 217, 217, 1);
  border-radius: 48px;
 display: flex;
 align-items: center;
 justify-content: center;

}

.stat__image {
  width: 50px;
  padding: 10px;
}

.stat__text {
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: black;
  padding: 10px;
}

.buttonholder {
  display: flex;
  justify-content: center;
  flex: 1;
  margin-top: 200px;
}

.dead {
  font-size: 18px;
  color: #fff;
  text-align: center;
}

.footerholder {
  margin-top: auto;
  padding: 40px;
}

.footer {
  display: flex;
  justify-content: space-around;
  background: rgba(217, 217, 217, 1);
  border-radius: 48px;
  padding: 10px;
}

/*@media (max-width: 768px) {
 .stat {
    max-width: 100px;
    padding: 5px;
  }

  .stat__image {
    width: 20%;
    max-width: 30px;
  } 

  .stat__text {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .stat {
    max-width: 80px;
  }

  .stat__image {
    width: 25%;
    max-width: 25px;
  }

  .stat__text {
    font-size: 14px;
  } 
} */
</style>