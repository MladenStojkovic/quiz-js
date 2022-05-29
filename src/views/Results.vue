<script setup>
import { inject } from "vue";
import { collection, doc, setDoc } from "@firebase/firestore";
import { useRouter } from "vue-router";

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

const router = useRouter();

const reset = () => {
  state.setUser({});
  state.resetAnswers();
  router.push({
    path: "/",
  });
};
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
        class="font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-5"
      >
        {{ state.correctAnswers }} / {{ state.questions.length }}
      </p>
      <button
        @click="reset"
        class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none"
      >
        Try again?
      </button>
    </div>
  </div>
</template>
