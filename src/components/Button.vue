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
  transition: all 0.2s ease-in-out;
}

.button:hover {
  transform: translateY(-2px);
}
</style>