//Vue import
import Vue from 'vue';
//ApolloClient import
import {apolloClient} from './apollo'
//Student Querys
import {CREATE_STUDENT_MUTATION, UPDATE_SINGLE_STUDENT} from './querys/AllStudents.gql'
//User Querys
import {AUTHENTICATE_USER} from './querys/Users.gql'
import {CREATE_USER_MUTATION, AUTHENTICATE_USER} from './querys/Users.gql'
//Event Querys
import {CREATE_EVENT_MUTATION} from './querys/Events.gql'
//Router
import router from './router'

//EventBus creation
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
EventBus.$on('createUser', user => {
  const { name, email, password, isAdmin, softDelete } = user;
  apolloClient.mutate({
    mutation: CREATE_USER_MUTATION,
    variables: {
      name,
      email,
      password,
      isAdmin,
      softDelete
    },
    update: (cache, {data:{createdUser}}) => {
      apolloClient.resetStore()
    }
  });
});
EventBus.$on('authenticateUser', user => {
  const { email, pass} = user;
  apolloClient.mutate({
    mutation: AUTHENTICATE_USER,
    variables: {
      email: user.email,
      password: user.pass,
    },
    update: (cache, { data: { authenticateUser } }) => {
      console.log(authenticateUser);
      localStorage.setItem('userToken', authenticateUser.token);
      router.push({ name: 'jury' })
    }
  });
});
//END for Users
//For Events
EventBus.$on('createEvent', evenement =>{
  const { academicYear, courseName, softDelete, authorId, jurysIds, studentsIds, projectsIds, weights } = evenement;
  apolloClient.mutate({
    mutation: CREATE_EVENT_MUTATION,
    variables: {
      academicYear: evenement.academicYear,
      courseName: evenement.courseName,
      softDelete: evenement.softDelete,
      authorId: evenement.authorId,
      jurysIds: evenement.jurysIds,
      studentsIds: evenement.studentsIds
    },
    update: (cache, { data: { createEvent } }) => {
      console.log('Event Created')
      //const data = proxy.readQuery({ query: TodoAppQuery })
      console.log(createEvent)
      console.log(evenement)
      /*evenement.studentsIds.fetch(
      console.log()
    )*/

    evenement.studentsIds.forEach( function(s) {
      console.log(s)
      evenement.projectsIds.forEach( function(p) {
        console.log(p)
        //console.log()
        console.log(evenement.projectsIds.indexOf(p))
        let projectindex = evenement.projectsIds.indexOf(p);
        let weightindex = evenement.weights[projectindex]
        console.log(evenement.weights[projectindex])
      } )
    } )
  }
})
});
