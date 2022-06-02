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
  <div class="flex justify-end items-center h-screen custom-main-wrapper">
    <img src="../public/logo.png" class="logo" />
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
      <div class="waviy">
        <span style="--i: 1">I</span>
        <span style="--i: 2">t</span>
        <span style="--i: 3; margin-right: 10px">'s</span>
        <span style="--i: 4">A</span>
        <span style="--i: 5">l</span>
        <span style="--i: 6; margin-right: 10px">l</span>
        <span style="--i: 7">A</span>
        <span style="--i: 8">b</span>
        <span style="--i: 9">o</span>
        <span style="--i: 10">u</span>
        <span style="--i: 11; margin-right: 10px">t</span>
        <span style="--i: 12">P</span>
        <span style="--i: 13">e</span>
        <span style="--i: 14">o</span>
        <span style="--i: 15">p</span>
        <span style="--i: 16">l</span>
        <span style="--i: 17">e</span>
      </div>
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

.custom-main-wrapper {
  margin-right: 10%;
}

.logo {
  position: fixed;
  top: -55px;
  left: 20px;
  z-index: 9999;
}

.people {
  color: white;
  font-size: 2.25rem;
}

.waviy {
  position: fixed;
  right: 40px;
  bottom: 20px;
}
.waviy span {
  position: relative;
  display: inline-block;
  font-size: 40px;
  color: #fff;
  animation: flip 4s infinite;
  animation-delay: calc(0.2s * var(--i));
}
@keyframes flip {
  0%,
  80% {
    transform: rotateY(360deg);
  }
}

[data-type="select"]:not([data-multiple]) .formkit-inner:after {
  content: none !important;
}
</style>
