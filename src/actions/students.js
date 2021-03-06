import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_STUDENT = 'ADD_STUDENT'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'
export const UPDATE_STUDENTS = 'UPDATE_STUDENTS'

const updateStudents = students => ({
  type: UPDATE_STUDENTS,
  payload: students
})

const addStudent = student => ({
  type: ADD_STUDENT,
  payload: student
})

export const getStudents = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      dispatch(updateStudents(result.body))
    })
    .catch(err => console.error(err))
}


export const createStudent = (newStudent) => (dispatch, getState) => {
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
    .then(result => dispatch(updateStudents(result.body)))
    .catch(err => console.error(err))
}
