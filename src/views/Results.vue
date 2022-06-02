<script setup>
import { inject, ref } from "vue";
import { collection, doc, setDoc } from "@firebase/firestore";
import { useRouter } from "vue-router";
const emit = defineEmits(["stop-count"]);

const firebase = inject("firebase");
const state = inject("state");
const counter = inject("counter");

let finalTime = ref(0);

const saveInfo = async () => {
  const miliseconds = Date.now() - counter.value;
  const seconds = miliseconds / 1000;
  finalTime.value = seconds;
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
      class="border my-border mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <h2
        class="text-3xl mb-10 font-extrabold leading-9 tracking-tight text-white sm:text-4xl sm:leading-10"
      >
        Your results
        <br />
      </h2>
      <p class="leading-9 tracking-tight text-white sm:text-2xl sm:leading-10 mb-5">
        You answered {{ state.correctAnswers }} questions correctly in
        {{ finalTime }} seconds
      </p>
      <p class="leading-9 tracking-tight text-white sm:text-2xl sm:leading-10 mb-5">
        Thank you for your time! - <em>Badin Soft :)</em>
      </p>
    </div>
    <div class="align-right mt-5">
      <FormKit type="submit" label="Take another tour" @click="reset" />
    </div>
  </div>
</template>

<style>
.my-border {
  border-radius: 5px;
  border-width: 3px;
}

.align-right .formkit-wrapper {
  text-align: right;
  margin-right: 0;
  max-width: none;
}
</style>
