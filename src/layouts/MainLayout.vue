<template>
  <div class="layout">
    <div class="layout__header"></div>

    <main class="layout__main">
      <slot></slot>
    </main>

    <div class="layout__footer"></div>
  </div>
</template>

<script>
export default {
    name: "MainLayout"
}
</script>