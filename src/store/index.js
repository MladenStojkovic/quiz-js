// store.js
import { reactive } from 'vue'

export const state = reactive({
  user: {},
  questions: [],
  correctAnswers: 0,
  setUser(payload) {
    this.user = payload
  },
  setQuestions(payload) {
    this.questions = payload
  },
  incrementAnswers() {
    this.correctAnswers += 1
  }
})

export default {
  state: state
}