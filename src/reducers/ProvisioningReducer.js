import {
  DETECT_GROWNODE_SSID_STARTED,
  DETECT_GROWNODE_SSID_STOPPED,
  DETECTED_GROWNODE_SSID
} from '../actions'

const initialState = {
  detectedGrowNodeId: null,
  detectGrownodeSsidRef: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DETECT_GROWNODE_SSID_STARTED:
      return { detectGrownodeSsidRef: action.payload }
    case DETECTED_GROWNODE_SSID:
      return { detectedGrowNodeId: action.payload }
    case DETECT_GROWNODE_SSID_STOPPED:
      return { detectGrownodeSsidRef: null }
    default:
      return state
  }
}
