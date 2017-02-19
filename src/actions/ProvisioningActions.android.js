// import wifi from 'react-native-android-wifi'
import wifi from 'react-native-wifi-checker'
import { isSsidAGrownode } from '../utils'

export const DETECT_GROWNODE_SSID_STARTED = 'searching wifi ssids for grownode (android only)'
export const DETECT_GROWNODE_SSID_STOPPED = 'stopped searching wifi ssids for grownode (android only)'
export const DETECTED_GROWNODE_SSID = 'found grownode in scanned wifi ssids (android only)'

const detectGrownodeSsid = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: DETECT_GROWNODE_SSID_STARTED })

      const detectLoop = () => {
        console.log('searching')
        wifi.scan().then(() => {
          wifi.getWifiList().then((wifiList) => {
            const grownodeCandidate = wifiList.find(wifiObj => isSsidAGrownode(wifiObj.SSID))
            if (grownodeCandidate) {
              // Found grownode in wifiList
              dispatch({ type: DETECTED_GROWNODE_SSID, payload: grownodeCandidate.SSID })
              resolve(grownodeCandidate.SSID)
            } else {
              if (getState().provisioning.shouldDetectGrownode) {
                setTimeout(detectLoop, 5000)
              }
            }
          })
        })
      }

      detectLoop()
    })
  }
}

export const detectGrownodeSsidAndIfAndroidConnect = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // clearInterval(getState().provisioning.detectGrownodeSsidRef)
      // dispatch({ type: DETECT_GROWNODE_SSID_STOPPED })
      dispatch(detectGrownodeSsid()).then(ssid => {
        console.log('found', ssid)
      })
      //
    })
  }
}
