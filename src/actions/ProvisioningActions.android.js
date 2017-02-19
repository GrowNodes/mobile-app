import wifi from 'react-native-android-wifi'
import { isSsidAGrownode } from '../utils'

export const DETECTED_GROWNODE_SSID = 'found grownode in scanned wifi ssids (android only)'

export const detectGrownodeSsid = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      wifi.loadWifiList((wifiStringList) => {
        const wifiArray = JSON.parse(wifiStringList)

        const grownodeCandidate = wifiArray.find(wifiObj => isSsidAGrownode(wifiObj.SSID))

        if (grownodeCandidate) {
          // Found grownode in wifiArray
          dispatch({ type: DETECTED_GROWNODE_SSID, payload: grownodeCandidate.SSID })
          resolve(grownodeCandidate.SSID)
        } else {
          // Grownode not in wifiArray
          console.log('ssid not found')
        }
      },
      (error) => {
        console.log(error)
      })
    })
  }
}
