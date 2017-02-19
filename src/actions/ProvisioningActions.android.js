import wifi from 'react-native-android-wifi'
import { isSsidAGrownode } from '../utils'

export const DETECT_GROWNODE_SSID_STARTED = 'searching wifi ssids for grownode (android only)'
export const DETECT_GROWNODE_SSID_STOPPED = 'stopped searching wifi ssids for grownode (android only)'
export const DETECTED_GROWNODE_SSID = 'found grownode in scanned wifi ssids (android only)'

export const detectGrownodeSsidAndIfAndroidConnect = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const ref = setInterval(() => {
        // I don't think the wifi libary i'm using actually searches for wifi, maybe find another one
        // that actually calls the androd API to look for wifi.
        wifi.loadWifiList((wifiStringList) => {
          const wifiArray = JSON.parse(wifiStringList)

          const grownodeCandidate = wifiArray.find(wifiObj => isSsidAGrownode(wifiObj.SSID))

          if (grownodeCandidate) {
            console.log('found!!!')
            // Found grownode in wifiArray
            dispatch({ type: DETECTED_GROWNODE_SSID, payload: grownodeCandidate.SSID })
            clearInterval(getState().provisioning.detectGrownodeSsidRef)
            dispatch({ type: DETECT_GROWNODE_SSID_STOPPED })
            resolve(grownodeCandidate.SSID)
          } else {
            console.log('============')
            // Grownode not in wifiArray
            wifiArray.map(wifiObj => {
              console.log(wifiObj.SSID)
            })
          }
        },
        (error) => {
          console.log(error)
        })
      }, 3000)
      dispatch({ type: DETECT_GROWNODE_SSID_STARTED, payload: ref })
    })
  }
}
