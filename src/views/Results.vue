<script setup>
import { inject } from "vue";
import { collection, doc, setDoc } from "@firebase/firestore";

const firebase = inject("firebase");
const state = inject("state");

const saveInfo = async () => {
  const user = {
    name: state.user.name,
    email: state.user.email,
    points: state.correctAnswers,
  };
  const usersCol = collection(firebase, "users");
  await setDoc(doc(usersCol, user.email), user);
};

saveInfo();
</script>
<template>
  <div class="bg-gray-50">
    <div
      class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <h2
        class="text-3xl mb-10 font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        Results
        <br />
      </h2>
      <p
        class="font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        {{ state.correctAnswers }} / {{ state.questions.length }}
      </p>
    </div>
  </div>
</template>
