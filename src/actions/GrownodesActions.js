// import { Actions } from 'react-native-router-flux'
import { Base } from '../utils'

// export const EMPLOYEE_UPDATE = 'empl update'
// export const EMPLOYEE_CREATE = 'empl create'
export const GROWNODES_FETCHING = 'fetching list of grownodes'
export const GROWNODES_FETCH_FAIL = 'fetching list of grownodes failed'
export const GROWNODES_FETCH_SUCCESS = 'fetching list of grownodes success'

// export const grownodeUpdate = ({ prop, value }) => {
//   return {
//     type: EMPLOYEE_UPDATE,
//     payload: { prop, value },
//   }
// }
//
// export const grownodeCreate = ({ name, phone, shift }) => {
//   const { currentUser } = Base.auth()
//
//   return (dispatch) => {  // utilizing redux thunk to skip returning anything
//     Base.database().ref(`/users/${currentUser.uid}/grownodes`)
//     .push({ name, phone, shift })
//     .then(() => {
//       Actions.grownodeList({ type: 'reset' })
//       dispatch({ type: EMPLOYEE_CREATE })
//     })
//   }
// }


export function grownodesFetch() {
  return (dispatch) => {
    dispatch({ type: GROWNODES_FETCHING })

    return Base.fetch('grow_nodes', {
      context: {},
      asArray: false,
      queries: {
        orderByChild: 'owner_uid',
        equalTo: Base.auth().currentUser.uid,
      },
    }).then((data) => {
      console.log(data)
      dispatch({ type: GROWNODES_FETCH_SUCCESS, payload: data })
    }).catch((error) => {
      console.log(error)
      dispatch({ type: GROWNODES_FETCH_FAIL, payload: error })
    })
  }
}
