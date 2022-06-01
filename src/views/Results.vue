<script setup>
import { inject, nextTick } from "vue";
import { collection, doc, setDoc } from "@firebase/firestore";
import { useRouter } from "vue-router";
const emit = defineEmits(["stop-count"]);

const firebase = inject("firebase");
const state = inject("state");
const counter = inject("counter");

const saveInfo = async () => {
  const miliseconds = Date.now() - counter.value;
  const seconds = miliseconds / 1000;
  const user = {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    position: state.user.position,
    isAvailable: state.user.isAvailable,
    email: state.user.email,
    points: state.correctAnswers,
    track: state.user.track,
    time: seconds,
  };
  const usersCol = collection(firebase, "users");
  await setDoc(doc(usersCol, user.email), user);
  emit("stop-count");
};

saveInfo();

const router = useRouter();

const reset = () => {
  router.push({
    path: "/",
  });
  setTimeout(() => {
    state.setUser({});
    state.resetAnswers();
  }, 1000);
};
</script>
<template>
  <div>
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
        class="font-extrabold leading-9 tracking-tight text-gray-900 sm:text-2xl sm:leading-10 mb-5"
      >
        You got {{ state.correctAnswers }} / {{ state.questions.length }} questions right
      </p>
      <FormKit type="submit" label="Try again?" @click="reset" />
    </div>
  </div>
</template>
