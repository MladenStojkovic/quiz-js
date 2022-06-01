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
  const questionsList = questionsSnapshot.docs.map((doc) => doc.data());
  state.setQuestions(JSON.parse(questionsList[0][1]));
  router.push({
    path: "/quiz/1",
  });
  emit("start-count");
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
          help="The timer starts ticking when you choose!"
        />
        <FormKit type="submit" :disabled="!track" />
      </FormKit>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
