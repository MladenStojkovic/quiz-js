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
  <div class="bg-gray-50">
    <div
      class="mx-auto max-w-screen-xl px-4 py-12 flex justify-center sm:px-6 lg:py-16 lg:px-8"
    >
      <br />
      <FormKit type="form" @submit="submitAnswer" :actions="false">
        <FormKit
          v-model="answer"
          type="radio"
          :options="question.choices"
          validation="required"
          :label="question.question"
          help="Filler text"
        />
        <FormKit type="submit" :disabled="!answer" />
      </FormKit>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow"></div>
      </div>
    </div>
  </div>
</template>

<style></style>
