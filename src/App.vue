<script setup>
import { ref, provide, inject } from "vue";
import { getDocs, setDoc, doc, collection } from "firebase/firestore";
import { useRoute } from "vue-router";
import firebase from "./api/firebase";
provide("firebase", firebase);

let counter = ref(0);
let counterId = ref("");

provide("counter", counter);
const startCount = () => {
  counter.value = Date.now();
};

const stopCount = () => {
  counter.value = "";
};

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
  <div class="flex justify-end items-center h-screen mr-64">
    <main v-if="state.questions.length">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component
            @start-count="startCount"
            @stop-count="stopCount"
            :key="route.path"
            :is="Component"
          />
        </transition>
      </router-view>
    </main>
    <div class="box">
      <div class="wave -one"></div>
      <div class="wave -two"></div>
      <div class="wave -three"></div>
    </div>
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
