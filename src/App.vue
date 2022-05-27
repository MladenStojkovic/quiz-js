<script setup>
import { ref, provide } from "vue";
import firebase from "./api/firebase";
let counter = ref(0);
provide("firebase", firebase);

setInterval(() => {
  counter.value++;
}, 1000);
</script>

<template>
  <div>
    <header class="bg-white shadow" v-if="$route.meta.title">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 @click="counter = 0" class="text-3xl font-bold leading-tight text-gray-900">
          {{ $route.meta.title }} / {{ counter }}
        </h1>
      </div>
    </header>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  position: absolute;
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  position: absolute;
  opacity: 0;
}
</style>
