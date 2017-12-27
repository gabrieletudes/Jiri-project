export const mutations = {
    allStudents(state, payload) {
        state.allStudents = payload;
    },
    m_createStudent(state, student){
      state.student = student;
    },
    students(state, key) {
      state.students[key].event = true;
      if (state.students[key].event == true) {
          state.eventStudents.push(state.students[key])
          state.students.splice(key, 1)
      }
  },
}
