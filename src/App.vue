<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <NMessageProvider>
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { RouterView } from 'vue-router'
  import { NMessageProvider, NConfigProvider, zhCN, dateZhCN } from 'naive-ui'
  export default defineComponent({
    name: 'App',
    components: {
      RouterView,
      NMessageProvider,
      NConfigProvider
    },
    data() {
      return {
        zhCN,
        dateZhCN
      }
    },
  })
</script>

<style></style>
