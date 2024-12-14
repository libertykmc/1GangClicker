<script setup lang="ts">
import Header from "../components/Header.vue"
</script>


<template>
    <div class="shop">
    <Header />
    <h1 class="shop__title">Магазин</h1>
    <div class="shop__items">
        <!--Todo: item components-->
    </div>
    </div>
</template>


<style scoped>
.shop {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.shop__title {
    font-family: "Inter", sans-serif;
    font-size: 24px;
    font-weight: 500;
    color: #fff;
}
</style>