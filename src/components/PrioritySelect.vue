<script setup lang="ts">
import { UINativeSelect, UINativeSelectOption } from '@/components/ui/native-select';
</script>

<template>
  <UINativeSelect>
    <UINativeSelectOption value="" selected hidden disabled>Приоритет</UINativeSelectOption>
    <UINativeSelectOption value="1">1</UINativeSelectOption>
    <UINativeSelectOption value="2">2</UINativeSelectOption>
    <UINativeSelectOption value="3">3</UINativeSelectOption>
  </UINativeSelect>
</template>
