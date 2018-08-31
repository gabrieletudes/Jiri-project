//Vue import
import Vue from 'vue';
//ApolloClient import
import {apolloClient} from './apollo'
//Student Querys
import {CREATE_STUDENT_MUTATION, UPDATE_SINGLE_STUDENT} from './querys/AllStudents.gql'
//User Querys
import {CREATE_USER_MUTATION, AUTHENTICATE_USER} from './querys/Users.gql'
//Event Querys
import {CREATE_EVENT_MUTATION} from './querys/Events.gql'
//Implementation Querys
import {CREATE_IMPLEMENTATION_MUTATION} from './querys/Implementations.gql'
//Router
import router from './router'

//EventBus creation
const EventBus =  new Vue();

export default EventBus;

//For Students
EventBus.$on('createStudent', student => {
  const { name, email, group, softDelete } = student;
  apolloClient.mutate({
    mutation: CREATE_STUDENT_MUTATION,
    variables: {
      name: student.name,
      email: student.email,
      groupId: student.group,
      softDelete: student.softDelete,
    },
    update: (cache, {data:{createStudent}}) => {
      apolloClient.resetStore()
    }
  });
});

EventBus.$on('updateStudent', student => {
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
EventBus.$on('createEvent', evenement => {
  const { academicYear, courseName, eventStart, softDelete, authorId, jurysIds, studentsIds, projects } = evenement;
  let projectsIds = projects.map(project => project.id)
  apolloClient.mutate({
    mutation: CREATE_EVENT_MUTATION,
    variables: {
      academicYear,
      courseName,
      softDelete,
      eventStart,
      authorId,
      jurysIds,
      studentsIds,
      projectsIds: projectsIds
    },
    update: (cache, { data: { createEvent } }) => {
      evenement.studentsIds.forEach( function(studentid) {
        projectsIds.forEach( function(projectid) {
          let projectId = projectid,
          studentId = studentid,
          softDelete = false,
          eventId = createEvent.id,
          weight;

          evenement.projects.forEach( function(project) {
            if(project.id === projectid){
              weight = parseFloat(project.weight);
            }
          });

          apolloClient.mutate({
            mutation: CREATE_IMPLEMENTATION_MUTATION,
            variables: {
              softDelete,
              eventId,
              projectId,
              studentId,
              weight,
            },
            update: (cache, { data: { createImplementation } }) => {
              apolloClient.resetStore()
            }
          });
        })
      })
    }
  })
});
//End for Events
