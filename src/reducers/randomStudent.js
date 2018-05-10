import {ADD_RANDOMSTUDENT} from '../actions/students'

export default (state = null, {type, payload}) => {
  switch (type) {
    case ADD_RANDOMSTUDENT:
      return state = payload
    default:
      return state
  }
}
