import { DETECTED_GROWNODE_SSID } from '../actions'

const initialState = {
  detectedGrowNodeId: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DETECTED_GROWNODE_SSID:
      return { detectedGrowNodeId: action.payload }
    default:
      return state
  }
}
