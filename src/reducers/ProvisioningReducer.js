import {
  DETECT_GROWNODE_SSID_STARTED,
  DETECT_GROWNODE_SSID_STOPPED,
  DETECTED_GROWNODE_SSID,
  CONNECTING_TO_GROWNODE,
  CONNECTED_TO_GROWNODE,
  FETCHING_GROWNODE_NETWORKS,
  FETCHED_GROWNODE_NETWORKS
} from '../actions'

const initialState = {
  detectedGrownodeId: null,
  shouldDetectGrownode: false,
  scannedNetworks: [],
  statusText: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DETECT_GROWNODE_SSID_STARTED:
      return {
        ...state,
        shouldDetectGrownode: true,
        statusText: DETECT_GROWNODE_SSID_STARTED
      }

    case DETECT_GROWNODE_SSID_STOPPED:
      return { ...state, shouldDetectGrownode: false }

    case DETECTED_GROWNODE_SSID:
      return {
        ...state,
        detectedGrownodeId: action.payload,
        shouldDetectGrownode: false,
        statusText: DETECTED_GROWNODE_SSID
      }

    case CONNECTING_TO_GROWNODE:
      return { ...state, statusText: CONNECTING_TO_GROWNODE }

    case CONNECTED_TO_GROWNODE:
      return { ...state, statusText: CONNECTED_TO_GROWNODE }

    case FETCHING_GROWNODE_NETWORKS:
      return { ...state, statusText: FETCHING_GROWNODE_NETWORKS }

    case FETCHED_GROWNODE_NETWORKS:
      return {
        ...state,
        scannedNetworks: action.payload,
        statusText: FETCHED_GROWNODE_NETWORKS
      }

    default:
      return state
  }
}
