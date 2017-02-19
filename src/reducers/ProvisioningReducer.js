import {
  DETECT_GROWNODE_SSID_STARTED,
  DETECT_GROWNODE_SSID_STOPPED,
  DETECTED_GROWNODE_SSID
} from '../actions'

const initialState = {
  detectedGrownodeId: null,
  shouldDetectGrownode: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DETECT_GROWNODE_SSID_STARTED:
      return { ...state, shouldDetectGrownode: true }
    case DETECTED_GROWNODE_SSID:
      return {
        ...state,
        detectedGrownodeId: action.payload,
        shouldDetectGrownode: false
      }
    case DETECT_GROWNODE_SSID_STOPPED:
      return { ...state, shouldDetectGrownode: false }
    default:
      return state
  }
}
