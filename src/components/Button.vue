<script setup lang="ts"></script>


<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<style scoped>
.button {
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  background-color: transparent;
  cursor: pointer;
}
</style>