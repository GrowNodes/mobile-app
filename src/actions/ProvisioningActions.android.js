import rnwc from 'react-native-wifi-checker' // use this one to scan
import rnaw from 'react-native-android-wifi'  // use this for everything else
import { isSsidAGrownode } from '../utils'

export const DETECT_GROWNODE_SSID_STARTED = 'searching wifi ssids for grownode (android only)'
export const DETECT_GROWNODE_SSID_STOPPED = 'stopped searching wifi ssids for grownode (android only)'
export const DETECTED_GROWNODE_SSID = 'found grownode in scanned wifi ssids (android only)'

export const detectGrownode = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      rnaw.setEnabled(true)
      dispatch({ type: DETECT_GROWNODE_SSID_STARTED })

      const detectLoop = () => {
        console.log('searching')
        rnwc.scan().then(() => {
          rnwc.getWifiList().then((wifiList) => {
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

export const detectGrownodeAndIfAndroidConnect = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // clearInterval(getState().provisioning.detectGrownodeRef)
      // dispatch({ type: DETECT_GROWNODE_SSID_STOPPED })
      dispatch(detectGrownode()).then(ssid => {
        console.log('found', ssid)
        rnaw.findAndConnect(ssid, '', (found) => {
          // found returns true if ssid is in the range
          if (found) {
            console.log('wifi is in range')
          } else {
            console.log('wifi is not in range')
          }
        })
      })
      //
    })
  }
}
