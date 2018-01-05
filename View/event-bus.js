import Vue from 'vue';
import {apolloClient} from './apollo'
import {CREATE_STUDENT_MUTATION, UPDATE_SINGLE_STUDENT} from './querys/AllStudents.gql'
import {AUTHENTICATE_USER} from './querys/Users.gql'
import router from './router'

const EventBus =  new Vue();

export default EventBus;

//For Students
EventBus.$on('createStudent', student =>{
  const { name, email, softDelete } = student;
  apolloClient.mutate({
    mutation: CREATE_STUDENT_MUTATION,
    variables: {
      name: student.name,
      email: student.email,
      softDelete: student.softDelete,
    },
    update: (cache, {data:{createdStudent}}) => {
      apolloClient.resetStore()
      // Read the data from our cache for this query.
      //  const data = store.readQuery({ query: QUERY_ALL_STUDENTS })
      // Add our student from the mutation to the end
      //data.allStudents.push(student.data.createStudent)
      // Write our data back to the cache.
      //  store.writeQuery({ query: QUERY_ALL_STUDENTS, data })
    }
  });
});

EventBus.$on('updateStudent', student =>{
  const { studentId, name, email, softDelete } = student;
  apolloClient.mutate({
    mutation: UPDATE_SINGLE_STUDENT,
    variables: {
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      softDelete: student.softDelete,
    },
    update: (cache, {data:{createdStudent}}) => {
      apolloClient.resetStore()
    }
  });
});
//END for Students
//For Users
EventBus.$on('authenticateUser', user =>{
  const { email, password} = user;
  apolloClient.mutate({
    mutation: AUTHENTICATE_USER,
    variables: {
      email: user.email,
      password: user.password,
    },
    update: (cache, { data: { authenticateUser } }) => {
      console.log(authenticateUser);
      localStorage.setItem('userToken', authenticateUser.token);
      router.push({ name: 'jury' })
    }
    });
  });
//END for Users
