import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_STUDENT = 'ADD_STUDENT'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'
export const UPDATE_STUDENTS = 'UPDATE_STUDENTS'
// export const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS'
// export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS'

const updateStudents = students => ({
  type: UPDATE_STUDENTS,
  payload: students
})

const addStudent = student => ({
  type: ADD_STUDENT,
  payload: student
})

// const updateGameSuccess = () => ({
//   type: UPDATE_GAME_SUCCESS
// })
//
// const joinGameSuccess = () => ({
//   type: JOIN_GAME_SUCCESS
// })


export const getStudents = (batchId) => (dispatch, getState) => {
  console.log("getStudents action has been fired! for batch", batchId)
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/batchStudents/${batchId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      console.log("THis was returned!",result.body)
      dispatch(updateStudents(result.body))
    })
    .catch(err => console.error(err))
}

// export const joinGame = (gameId) => (dispatch, getState) => {
//   const state = getState()
//   const jwt = state.currentUser.jwt
//
//   if (isExpired(jwt)) return dispatch(logout())
//
//   request
//     .post(`${baseUrl}/games/${gameId}/players`)
//     .set('Authorization', `Bearer ${jwt}`)
//     .then(_ => dispatch(joinGameSuccess()))
//     .catch(err => console.error(err))
// }

export const createStudent = (newStudent) => (dispatch, getState) => {
  console.log("Inside the createStudent action", newStudent)
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(newStudent)
    .then(result => dispatch(newStudent(result.body)))
    .catch(err => console.error(err))
}

// export const updateGame = (gameId, board) => (dispatch, getState) => {
//   const state = getState()
//   const jwt = state.currentUser.jwt
//
//   if (isExpired(jwt)) return dispatch(logout())
//
//   request
//     .patch(`${baseUrl}/games/${gameId}`)
//     .set('Authorization', `Bearer ${jwt}`)
//     .send({ board })
//     .then(_ => dispatch(updateGameSuccess()))
//     .catch(err => console.error(err))
// }
