import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_BATCH = 'ADD_BATCH'
export const UPDATE_BATCH = 'UPDATE_BATCH'
export const UPDATE_BATCHES = 'UPDATE_BATCHES'
// export const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS'
// export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS'

const updateBatches = batches => ({
  type: UPDATE_BATCHES,
  payload: batches
})

const addBatch = batch => ({
  type: ADD_BATCH,
  payload: batch
})

// const updateGameSuccess = () => ({
//   type: UPDATE_GAME_SUCCESS
// })
//
// const joinGameSuccess = () => ({
//   type: JOIN_GAME_SUCCESS
// })


export const getBatches = () => (dispatch, getState) => {
  console.log("getBatches action has been fired!")
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/batches`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateBatches(result.body)))
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

export const createBatch = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/batches`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(addBatch(result.body)))
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
