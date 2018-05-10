import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_STUDENT = 'ADD_STUDENT'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'
export const UPDATE_STUDENTS = 'UPDATE_STUDENTS'
export const ADD_RANDOMSTUDENT = 'ADD_RANDOMSTUDENT'

const addRandomStudent = student => ({
  type: ADD_RANDOMSTUDENT,
  payload: student
})

const updateStudents = students => ({
  type: UPDATE_STUDENTS,
  payload: students
})

const addStudent = student => ({
  type: ADD_STUDENT,
  payload: student
})


export const getStudents = () => (dispatch, getState) => {
  console.log("getStudents action has been fired! for batch")
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      console.log("THis was returned!",result.body)
      dispatch(updateStudents(result.body))
    })
    .catch(err => console.error(err))
}

export const getRandomStudent = (batchId) => (dispatch, getState) => {
  console.log("getRandomStudent has been fired")
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/randomstudent/${batchId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      console.log("THis was returned!",result.body)
      dispatch(addRandomStudent(result.body))
    })
    .catch(err => console.error(err))
}

export const createStudent = (newStudent) => (dispatch, getState) => {
  console.log("Inside the createStudent action", newStudent)
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(newStudent)
    .then(result => dispatch(addStudent(result.body)))
    .catch(err => console.error(err))
}

export const editStudent = (studentEdit) => (dispatch, getState) => {
  console.log("Inside the editStudent action", studentEdit.studentId)
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .patch(`${baseUrl}/students/${studentEdit.studentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(studentEdit)
    .catch(err => console.error(err))
}

export const deleteStudent = (studentId, currStudents) => (dispatch, getState) => {
  console.log("Inside the deleteStudent action", studentId)
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .delete(`${baseUrl}/students/${studentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .catch(err => console.error(err))

  // console.log("Old state", currStudents)
  // const newState = currStudents.filter( (student, index) => student.id !== studentId)
  // console.log("Creating new state", newState)
  // updateStudents(newState)
}
