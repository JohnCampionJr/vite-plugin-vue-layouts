<template>
  <el-button type="info">
    <slot />
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ButtonTwo',
})
</script>
