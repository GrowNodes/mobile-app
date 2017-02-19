import {
  DETECT_GROWNODE_SSID_STARTED,
  DETECT_GROWNODE_SSID_STOPPED,
  DETECTED_GROWNODE_SSID,
  FETCHED_GROWNODE_NETWORKS
} from '../actions'

const initialState = {
  detectedGrownodeId: null,
  shouldDetectGrownode: false,
  scannedNetworks: []
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

    case FETCHED_GROWNODE_NETWORKS:
      return { ...state, scannedNetworks: action.payload }

    default:
      return state
  }
}
