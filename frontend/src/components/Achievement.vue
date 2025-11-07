<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  isUnlocked: boolean;
  icon?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="achievement" :class="{ 'achievement--unlocked': isUnlocked }">
    <div class="achievement__icon">
      <img
        v-if="isUnlocked"
        :src="icon || '/Money.png'"
        alt="achievement"
        class="achievement__image"
      />
      <div v-else class="achievement__locked">?</div>
    </div>
    <div class="achievement__content">
      <h3 class="achievement__title">{{ title }}</h3>
      <p class="achievement__description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.achievement {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.achievement--unlocked {
  background: rgba(76, 175, 80, 0.2);
  border-color: #4caf50;
}

.achievement__icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.achievement__image {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.achievement__locked {
  color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
  font-weight: bold;
}

.achievement__content {
  flex: 1;
}

.achievement__title {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.achievement__description {
  margin: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.3;
}

.achievement--unlocked .achievement__title {
  color: #4caf50;
}

.achievement--unlocked .achievement__description {
  color: rgba(255, 255, 255, 0.9);
}
</style>
