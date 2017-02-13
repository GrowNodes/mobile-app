// import { Actions } from 'react-native-router-flux'
import { Base } from '../utils'

export const GROWNODES_FETCHING = 'fetching list of grownodes'
export const GROWNODES_SYNCING = 'synchronizing list of grownodes'
export const GROWNODES_FETCH_FAIL = 'fetching list of grownodes failed'
export const GROWNODES_FETCH_SUCCESS = 'fetching list of grownodes success'

export function grownodesFetch () {
  return (dispatch, getState) => {
    dispatch({ type: GROWNODES_FETCHING })

    return Base.fetch('grownodes', {
      context: {},
      asArray: false,
      queries: {
        orderByChild: 'owner_uid',
        equalTo: getState().auth.user.uid
      }
    }).then((data) => {
      dispatch({ type: GROWNODES_FETCH_SUCCESS, payload: data })
    }).catch((error) => {
      dispatch({ type: GROWNODES_FETCH_FAIL, payload: error })
      console.error(GROWNODES_FETCH_FAIL, error)
    })
  }
}

export const grownodesSync = () => {
  return (dispatch, getState) => {
    const { user } = getState().auth

    Base.database().ref(`grownodes`)
      .orderByChild('owner_uid').equalTo(user.uid)
      .on('value', (snapshot) => {
        dispatch({ type: GROWNODES_FETCH_SUCCESS, payload: snapshot.val() })
      })

    dispatch({ type: GROWNODES_SYNCING })
    return Promise.resolve()
  }
}

// export const grownodesFetchAndSync = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve, reject) => {
//       const { user } = getState().auth
//       console.log(user)
//       dispatch({ type: GROWNODES_FETCHING })
//
//       Base.database().ref(`/users/${user.uid}/employees`)
//       .orderByChild('owner_uid').equalTo(user.uid)
//       .on('value', (snapshot) => {
//         dispatch({ type: GROWNODES_FETCH_SUCCESS, payload: snapshot.val() })
//         resolve()
//       })
//     })
//   }
// }
