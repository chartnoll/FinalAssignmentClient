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


export const getEvaluations = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/evaluations`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      dispatch(updateEvaluations(result.body))
    })
    .catch(err => console.error(err))
}

export const createEvaluation = (newEval) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/evaluations`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(newEval)
    .then(result => dispatch(addEvaluation(result.body)))
    .catch(err => console.error(err))
}
