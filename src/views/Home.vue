<script setup>
import { inject, ref } from "vue";
import { setDoc, doc, collection } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();
const firebase = inject("firebase");
const state = inject("state");
let firstName = ref("");
let lastName = ref("");
let position = ref("");
let email = ref("");
let isAvailable = ref(false);

const allPositions = ["Frontend", "Backend", "Devops", "Quality assurance", "Designer"];

const setUser = async () => {
  const user = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    position: position.value,
    isAvailable: isAvailable.value,
    points: 0,
  };
  const usersCol = collection(firebase, "users");
  await setDoc(doc(usersCol, email.value), user);
  state.setUser(user);
  router.push("/track");
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
        <FormKit
          v-model="firstName"
          type="text"
          validation="required"
          label="First Name"
        />
        <FormKit v-model="lastName" type="text" validation="required" label="Last Name" />
        <FormKit
          v-model="email"
          type="email"
          validation="required|*email"
          label="Email"
        />
        <FormKit
          v-model="position"
          type="select"
          label="Position"
          :options="allPositions"
        />
        <FormKit
          v-model="isAvailable"
          type="checkbox"
          label="I wish to be contacted by HR representatives regarding job offers"
        />
      </FormKit>
    </div>
  </div>
</template>
