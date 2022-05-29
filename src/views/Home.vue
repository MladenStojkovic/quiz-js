<script setup>
import { inject, ref } from "vue";
import { setDoc, doc, collection } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();
const firebase = inject("firebase");
const state = inject("state");
let name = ref("");
let email = ref("");

const setUser = async () => {
  const user = {
    name: name.value,
    email: email.value,
    points: 0,
  };
  const usersCol = collection(firebase, "users");
  await setDoc(doc(usersCol, email.value), user);
  state.setUser(user);
  router.push("/quiz/1");
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
        Ready to dive in?
        <br />
      </h2>
      <FormKit @submit="setUser" type="form" :config="{ validationVisibility: 'submit' }">
        <FormKit v-model="name" type="text" validation="required" label="Username" />
        <FormKit
          v-model="email"
          type="email"
          validation="required|*email"
          label="Email"
        />
      </FormKit>
    </div>
  </div>
</template>
