<script setup>
import { ref, provide, inject } from "vue";
import { getDocs, setDoc, doc, collection } from "firebase/firestore";
import { useRoute } from "vue-router";
import firebase from "./api/firebase";
provide("firebase", firebase);

const state = inject("state");
const route = useRoute();
async function getQuestions(db) {
  const questionsCol = collection(db, "questions");
  const questionsSnapshot = await getDocs(questionsCol);
  const questionsList = questionsSnapshot.docs.map((doc) => doc.data());
  state.setQuestions(JSON.parse(questionsList[0][1]));
}

getQuestions(firebase);
</script>

<template>
  <div>
    <header class="bg-white shadow" v-if="$route.meta.title">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 @click="counter = 0" class="text-3xl font-bold leading-tight text-gray-900">
          {{ $route.meta.title }} / {{ state.user.email }} / {{ state.correctAnswers }}
        </h1>
      </div>
    </header>
    <main v-if="state.questions.length">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :key="route.path" :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
