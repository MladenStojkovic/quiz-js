<script setup>
import { ref, inject } from "vue";
import firebase from "../api/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useRouter } from "vue-router";

const emit = defineEmits(["start-count"]);

const state = inject("state");

const router = useRouter();

let track = ref("");

const getQuestions = async () => {
  state.user.track = track.value;
  const questionsCol = collection(firebase, "questions");
  const questionsSnapshot = await getDocs(questionsCol);
  const questionsList = await questionsSnapshot.docs.map((doc) => doc.data());
  console.log(JSON.parse(questionsList[0][1]));
  const easyQuestions = JSON.parse(questionsList[0][2]);
  const hardQuestions = JSON.parse(questionsList[0][1]);
  const shuffledEasy = easyQuestions.sort(() => 0.5 - Math.random());
  const shuffledHard = hardQuestions.sort(() => 0.5 - Math.random());

  const questions = [...shuffledEasy.slice(0, 3), ...shuffledHard.slice(0, 3)];

  state.setQuestions(questions);
  router.push({
    path: "/quiz/1",
  });
  emit("start-count");
};
</script>

<template>
  <div>
    <div
      class="custom-wrapper mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <h2
        class="custom-title text-3xl mb-10 font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        Choose your track
        <br />
      </h2>
      <FormKit
        @submit="getQuestions"
        type="form"
        :config="{ validationVisibility: 'submit' }"
        :actions="false"
      >
        <FormKit
          v-model="track"
          type="radio"
          :options="['Frontend', 'Backend']"
          label="The timer starts ticking when you choose!"
        />
        <FormKit type="submit" :disabled="!track" />
      </FormKit>
    </div>
  </div>
</template>

<style>
.custom-title {
  color: white;
}

.custom-wrapper .formkit-fieldset {
  border: 3px solid white !important;
  padding: 50px;
  min-width: 500px;
}

.custom-wrapper .formkit-help {
  color: white;
  font-size: 20px;
}

.custom-wrapper ul.formkit-options {
  display: flex;
  justify-content: space-between;
}

.custom-wrapper .formkit-option {
  margin: 20px 0 0 0 !important;
}

.custom-wrapper .formkit-option .formkit-label {
  color: white;
  font-size: 25px;
  text-transform: uppercase;
}

.custom-wrapper span.formkit-decorator {
  box-shadow: 0px 0px 0px 1px white !important;
}

input[type="radio"].formkit-input:checked ~ .formkit-decorator::before {
  background-color: white !important;
}

[data-type="button"][data-disabled] .formkit-input,
[data-type="button"] .formkit-input[disabled],
[data-type="submit"][data-disabled] .formkit-input,
[data-type="submit"] .formkit-input[disabled] {
  border: 3px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: none;
  background-color: transparent !important;
}

.formkit-legend {
  color: white !important;
}
</style>
