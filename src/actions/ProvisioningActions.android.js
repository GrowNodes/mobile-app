import rnwc from 'react-native-wifi-checker' // use this one to scan
import WifiManager from 'react-native-wifi-manager'

import { isSsidAGrownode } from '../utils'

export const DETECT_GROWNODE_SSID_STARTED = 'searching wifi ssids for grownode (android only)'
export const DETECT_GROWNODE_SSID_STOPPED = 'stopped searching wifi ssids for grownode (android only)'
export const DETECTED_GROWNODE_SSID = 'found grownode in scanned wifi ssids (android only)'

export const CONNECTING_TO_GROWNODE = 'connecting to grownode setup AP'
export const CONNECTED_TO_GROWNODE = 'connected to grownode setup AP'

export const FETCHING_GROWNODE_NETWORKS = 'fetching networks from grownode'
export const FETCHED_GROWNODE_NETWORKS = 'fetched networks from grownode'

export const detectGrownode = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
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
    dispatch({ type: CONNECTING_TO_GROWNODE })
    return new Promise((resolve, reject) => {
      // Get grownode ssid
      const grownodeSsid = getState().provisioning.detectedGrownodeId
      // Connect to grownode ssid
      WifiManager.connect(grownodeSsid, '')
      // recursive function, checks wifi connection and grownode heartbeat
      const checkConnection = () => {
        console.log('checking')
        WifiManager.status((status) => {
          if (status !== 'CONNECTED') {
            setTimeout(() => { checkConnection() }, 1000)
            return
          }
          console.log('connected to something, checking')
          fetch('http://192.168.123.1/heart', {
            method: 'get'
          }).then((response) => {
            dispatch({ type: CONNECTED_TO_GROWNODE })
            resolve()
          }).catch(() => {
              // this should never happen unless we connected to the wrong network
              // or if grownode is not responding
            checkConnection()
          })
        })
      }
      checkConnection()
    })
  }
}

export const fetchNetworksFromGrownode = () => {
  return (dispatch) => {
    dispatch({ type: FETCHING_GROWNODE_NETWORKS })
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
