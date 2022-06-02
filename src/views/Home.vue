<script setup>
import { inject, ref } from "vue";
import { setDoc, doc, collection } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();
const firebase = inject("firebase");
const state = inject("state");
let firstName = ref("");
let lastName = ref("");
let position = ref("Frontend");
let email = ref("");
let isAvailable = ref(false);

const allPositions = ["Frontend", "Backend", "Devops", "Quality Assurance", "Designer"];

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
  <div>
    <div
      class="custom mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-16 lg:px-8"
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

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #0e6cc4;
  overflow-x: hidden;
  overflow-y: hidden;
}

/*waves****************************/

.box {
  position: fixed;
  top: 0;
  transform: rotate(80deg);
  left: 0;
}

.wave {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  position: absolute;
  top: 3%;
  left: 10%;
  background: #0af;
  width: 2000px;
  height: 1570px;
  margin-left: -150px;
  margin-top: -250px;
  transform-origin: 50% 48%;
  border-radius: 43%;
  animation: drift 7000ms infinite linear;
}

.wave.-three {
  animation: drift 7500ms infinite linear;
  position: fixed;
  background-color: #77daff;
}

.wave.-two {
  animation: drift 3000ms infinite linear;
  opacity: 0.1;
  background: white;
  position: fixed;
}

.box:after {
  content: "";
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  transform: translate3d(0, 0, 0);
}

@keyframes drift {
  from {
    transform: rotate(0deg);
  }
  from {
    transform: rotate(360deg);
  }
}

/*LOADING SPACE*/

.contain {
  animation-delay: 4s;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  background: #25a7d7;
  background: -webkit-linear-gradient(#25a7d7, #2962ff);
  background: linear-gradient(#25a7d7, #25a7d7);
}

.icon {
  width: 100px;
  height: 100px;
  margin: 0 5px;
}

/*Animation*/
.icon:nth-child(2) img {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.icon:nth-child(3) img {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.icon:nth-child(4) img {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

/* .icon img {
  -webkit-animation: anim 2s ease infinite;
  animation: anim 2s ease infinite;
  -webkit-transform: scale(0, 0) rotateZ(180deg);
  transform: scale(0, 0) rotateZ(180deg);
} */

/* @-webkit-keyframes anim {
  0% {
    -webkit-transform: scale(0, 0) rotateZ(-90deg);
    transform: scale(0, 0) rotateZ(-90deg);
    opacity: 0;
  }
  30% {
    -webkit-transform: scale(1, 1) rotateZ(0deg);
    transform: scale(1, 1) rotateZ(0deg);
    opacity: 1;
  }
  50% {
    -webkit-transform: scale(1, 1) rotateZ(0deg);
    transform: scale(1, 1) rotateZ(0deg);
    opacity: 1;
  }
  80% {
    -webkit-transform: scale(0, 0) rotateZ(90deg);
    transform: scale(0, 0) rotateZ(90deg);
    opacity: 0;
  }
} */
/* 
@keyframes anim {
  0% {
    -webkit-transform: scale(0, 0) rotateZ(-90deg);
    transform: scale(0, 0) rotateZ(-90deg);
    opacity: 0;
  }
  30% {
    -webkit-transform: scale(1, 1) rotateZ(0deg);
    transform: scale(1, 1) rotateZ(0deg);
    opacity: 1;
  }
  50% {
    -webkit-transform: scale(1, 1) rotateZ(0deg);
    transform: scale(1, 1) rotateZ(0deg);
    opacity: 1;
  }
  80% {
    -webkit-transform: scale(0, 0) rotateZ(90deg);
    transform: scale(0, 0) rotateZ(90deg);
    opacity: 0;
  }
} */

.custom,
.custom h2,
.custom .formkit-input {
  color: white;
}

.custom .formkit-inner {
  box-shadow: none;
}

.custom .formkit-input {
  box-shadow: none;
  border: 3px solid white;
}

.custom .formkit-decorator {
  border: 3px solid white !important;
  box-shadow: none !important;
}

.custom input[type="checkbox"].formkit-input ~ .formkit-decorator::before {
  transition: border-color 0.2s ease-in-out;
}

.custom input[type="checkbox"].formkit-input:checked ~ .formkit-decorator::before {
  border-color: white;
}

.custom .formkit-message {
  color: white;
}

.custom [data-type="submit"] .formkit-input {
  background-color: white;
  color: #0e6cc4;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
}

.custom [data-type="submit"] .formkit-input:hover {
  background-color: #0e6cc4;
  color: white;
}

.custom input[type="radio"].formkit-input:checked ~ .formkit-decorator::before {
  background-color: white !important;
  border-color: white !important;
}

.custom select.formkit-input option {
  color: black !important;
}

/* .custom select.formkit-input:after {
  color: white;
} */
</style>
