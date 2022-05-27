// store.js
import { reactive } from 'vue'

export const state = reactive({
  user: {},
  questions: [],
  setUser(payload) {
    this.user = payload
  },
  setQuestions(payload) {
    this.questions = payload
  }
})

export default {
  state: state
}