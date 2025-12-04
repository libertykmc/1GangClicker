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
  max-width: min(400px, 70vw);
  max-height: min(600px, 75vh);
  width: auto;
  height: auto;
  align-items: center;
  justify-content: center;
}

.button:hover {
  transform: translateY(-2px);
}

.button :deep(img) {
  max-width: min(400px, 70vw);
  max-height: min(600px, 75vh);
  width: auto;
  height: auto;
  object-fit: contain;
}
</style>
