<template>
  <NMessageProvider>
    <RouterView />
  </NMessageProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { RouterView } from 'vue-router'
  import { NMessageProvider } from 'naive-ui'
  export default defineComponent({
    name: 'App',
    components: {
      RouterView,
      NMessageProvider
    }
  })
</script>

<style></style>
