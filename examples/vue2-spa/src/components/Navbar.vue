<template>
  <header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="0"> home </el-menu-item>
      <el-menu-item index="1"> about </el-menu-item>
      <el-menu-item index="2"> news </el-menu-item>
    </el-menu>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useRouter } from 'vue2-helpers/vue-router'
export default defineComponent({
  setup() {
    const route = useRouter()
    const activeIndex = ref('0')

    const handleSelect = (key: string) => {
      const routes = ['/', '/about', '/news/1']
      activeIndex.value = key
      const idx = Number(key)
      const path = routes[idx]
      route.push(path)
    }
    return { activeIndex, handleSelect }
  },
})
</script>
