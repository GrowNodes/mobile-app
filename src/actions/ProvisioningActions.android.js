import rnwc from 'react-native-wifi-checker' // use this one to scan
import rnaw from 'react-native-android-wifi'  // use this for everything else
import { isSsidAGrownode } from '../utils'

export const DETECT_GROWNODE_SSID_STARTED = 'searching wifi ssids for grownode (android only)'
export const DETECT_GROWNODE_SSID_STOPPED = 'stopped searching wifi ssids for grownode (android only)'
export const DETECTED_GROWNODE_SSID = 'found grownode in scanned wifi ssids (android only)'
export const FETCHED_GROWNODE_NETWORKS = 'fetched networks from grownode'

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

export const connectToDetectedGrownode = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const grownodeSsid = getState().provisioning.detectedGrownodeId

      const connectToWifi = () => {
        console.log('connecting to', grownodeSsid)
        rnaw.findAndConnect(grownodeSsid, '', (found) => {
          if (found) {
            setTimeout(() => {
              fetch('http://192.168.123.1/heart', {
                method: 'get'
              }).then((response) => {
                resolve()
                console.log(response.status)
              }).catch(() => {
                connectToWifi()
              })
            }, 5000)
          } else {
            connectToWifi()
          }
        })
      }
      rnaw.disconnect()
      connectToWifi()
    })
  }
}

export const fetchNetworksFromGrownode = () => {
  return (dispatch) => {
    fetch('http://192.168.123.1/networks', {
      method: 'get'
    }).then((response) => {
      return response.json()
    }).then((networksObj) => {
      dispatch({ type: FETCHED_GROWNODE_NETWORKS, payload: networksObj.networks })
    }).catch(() => {
      // setTimeout(() => { connectToWifi() }, 5000)
    })
  }
}

export const provisionGrownode = () => {
  return dispatch => {
    fetch('http://homie.config/config', {
      method: 'put',
      body: JSON.stringify({
        'name': 'some nickname test',
        'wifi': {
          'ssid': 'PENIS',
          'password': '12345678'
        },
        'mqtt': {
          'host': 'demo.grownodes.com',
          'port': 1883,
          'base_topic': 'nodes/',
          'auth': false
        },
        'ota': {
          'enabled': false
        },
        'settings': {
          'light_off_at': 22,
          'light_on_at': 5
        }
      })
    }).then((response) => {
      return response.text()
    }).then(text => {
      console.log(text)
    }).catch((err) => {
      console.log(err)
    })
  }
}
