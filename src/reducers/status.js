import {UPDATE_STATUS} from '../actions/status'


export default (state = null, {type, payload}) => {
  switch (type) {
    case UPDATE_STATUS:
      return state = payload
    default:
      return state
  }
}
