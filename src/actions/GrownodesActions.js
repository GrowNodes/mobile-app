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


export const grownodesFetch = () => {
  const { currentUser } = Base.auth()
  console.log(currentUser)


  return (dispatch) => {
    dispatch({ type: GROWNODES_FETCHING })

    Base.database().ref('/grow_nodes')
    .orderByChild('owner_uid')
    .equalTo(Base.auth().currentUser.uid)
    .on('value', (snapshot) => {
      dispatch({ type: GROWNODES_FETCH_SUCCESS, payload: snapshot.val() })
    })
    // .catch((error) => {
    //   console.log(error)
    //   dispatch({ type: GROWNODES_FETCH_FAIL, error })
    // })
  }
}
