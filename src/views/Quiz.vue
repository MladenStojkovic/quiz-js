<script setup>
import { inject, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const state = inject("state");
if (!Object.keys(state.user).length) {
  router.push({ path: "/" });
}
let answer = ref("");

let question = ref(state.questions[route.params.id - 1]);
console.log(question);
let formattedQuestion = ref(question.value.question.replace(/\\n/g, "<br />"));
console.log(formattedQuestion.value);

const submitAnswer = () => {
  if (answer.value === question.value.correct) {
    state.incrementAnswers();
  }

  if (state.questions[route.params.id]) {
    router.push({
      path: `/quiz/${+route.params.id + 1}`,
    });
  } else {
    router.push({
      path: `/results`,
    });
  }
};
</script>

<template>
  <div>
    <div class="flex justify-end">
      <div
        class="custom text-xl mx-auto max-w-screen-xl px-4 py-12 flex flex-col justify-center items-center sm:px-6 lg:py-16 lg:px-8"
      >
        <br />
        <p v-html="formattedQuestion" class="mb-5"></p>
        <FormKit type="form" @submit="submitAnswer" :actions="false">
          <FormKit
            v-model="answer"
            type="radio"
            :options="question.choices"
            validation="required"
          />
          <FormKit type="submit" :disabled="!answer" label="Next" />
        </FormKit>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0 testing">
          <div class="inline-flex rounded-md testing1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.formkit-fieldset {
  padding: 50px !important;
  border: 3px solid white !important;
}

[data-type="radio"] .formkit-option {
  margin-bottom: 20px !important;
}

.formkit-legend {
  font-size: 22px !important;
  color: white !important;
}
</style>
