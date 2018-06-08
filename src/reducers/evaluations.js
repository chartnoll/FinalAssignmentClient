import { UPDATE_EVALUATIONS, ADD_EVALUATION} from '../actions/evaluations'

export default (state = null, {type, payload}) => {
  switch (type) {
    case ADD_EVALUATION:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_EVALUATIONS:
      return payload.reduce((evaluations, evaluation) => {
        evaluations[evaluation.id] = evaluation
        return evaluations
      }, {})

    default:
      return state
  }
}
