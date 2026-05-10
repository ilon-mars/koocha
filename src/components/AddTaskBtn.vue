<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import UIButton from '@/components/ui/button/UIButton.vue';

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <UIButton variant="secondary" @click="emit('click')">
    <Plus />
  </UIButton>
</template>
