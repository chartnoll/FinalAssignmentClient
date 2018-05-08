import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_EVALUATION = 'ADD_EVALUATION'
export const UPDATE_EVALUATION = 'UPDATE_EVALUATION'
export const UPDATE_EVALUATIONS = 'UPDATE_EVALUATIONS'

const updateEvaluations = evaluations => ({
  type: UPDATE_EVALUATIONS,
  payload: evaluations
})

const addEvaluation = evaluation => ({
  type: ADD_EVALUATION,
  payload: evaluation
})


export const getEvaluations = (studentId) => (dispatch, getState) => {
  console.log("getStudents action has been fired! for batch", studentId)
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/evaluations`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      console.log("THis was returned!",result.body)
      dispatch(updateEvaluations(result.body))
    })
    .catch(err => console.error(err))
}
//
// export const createStudent = (newStudent) => (dispatch, getState) => {
//   console.log("Inside the createStudent action", newStudent)
//   const state = getState()
//   const jwt = state.currentUser.jwt
//
//   if (isExpired(jwt)) return dispatch(logout())
//
//   request
//     .post(`${baseUrl}/students`)
//     .set('Authorization', `Bearer ${jwt}`)
//     .send(newStudent)
//     .then(result => dispatch(addStudent(result.body)))
//     .catch(err => console.error(err))
// }
//
// export const editStudent = (studentEdit) => (dispatch, getState) => {
//   console.log("Inside the editStudent action", studentEdit.studentId)
//   const state = getState()
//   const jwt = state.currentUser.jwt
//
//   if (isExpired(jwt)) return dispatch(logout())
//
//   request
//     .patch(`${baseUrl}/students/${studentEdit.studentId}`)
//     .set('Authorization', `Bearer ${jwt}`)
//     .send(studentEdit)
//     .catch(err => console.error(err))
// }
//
// export const deleteStudent = (studentId, currStudents) => (dispatch, getState) => {
//   console.log("Inside the deleteStudent action", studentId)
//   const state = getState()
//   const jwt = state.currentUser.jwt
//
//   if (isExpired(jwt)) return dispatch(logout())
//
//   request
//     .delete(`${baseUrl}/students/${studentId}`)
//     .set('Authorization', `Bearer ${jwt}`)
//     .catch(err => console.error(err))
// }
