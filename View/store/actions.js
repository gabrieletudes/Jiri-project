import { QUERY_ALL_STUDENTS, CREATE_STUDENT_MUTATION} from '../querys/AllStudents.gql'
import {apolloClient} from '../apollo'

export const actions = {
    setAllStudents({context, state, commit, mutations}){
        apolloClient.query({
            query: QUERY_ALL_STUDENTS,
        }).then(data => {
            let allStudents = data.data.allStudents
            commit('allStudents', allStudents)
            commit('students', allStudents)
        }).catch(error => {
            console.log("Students Query failed" + error)
        });
    },
    createStudent({commit}, student){
          const { name, email, softDelete } = student;
          apolloClient.mutate({
              mutation: CREATE_STUDENT_MUTATION,
              variables: {
                  name: student.name,
                  email: student.email,
                  softDelete: student.softDelete,
              },
          }).then(data => {
              commit('m_createStudent',student)
              console.log('Student created');
              //location.reload()
          }).catch(error => {
              console.log('Student creation failed' + error)
          });
      },
}
