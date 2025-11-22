<template>
  <div id="app">
    <nav class="app-nav">
      <router-link to="/users" class="app-nav__link">Пользователи</router-link>
      <router-link to="/invoices" class="app-nav__link">Счета</router-link>
    </nav>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

#app {
  min-height: 100vh;
}

.app-nav {
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
  padding: 0 24px;
  display: flex;
  gap: 24px;
}

.app-nav__link {
  display: inline-block;
  padding: 16px 0;
  color: #666;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.app-nav__link:hover {
  color: #007bff;
}

.app-nav__link.router-link-active {
  color: #007bff;
  border-bottom-color: #007bff;
}

.app-main {
  padding: 0;
}
</style>

