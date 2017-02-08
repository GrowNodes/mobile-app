// import { EMPLOYEE_UPDATE, EMPLOYEE_CREATE } from '../actions/EmployeeActions';
//
// const initialState = {
//     name: '',
//     phone: '',
//     shift: ''
// };
//
// export default (state = initialState, action) => {
//     switch (action.type) {
//         case EMPLOYEE_UPDATE:
//             // action.payload = { prop: 'employee name', value: 'james' }
//             return {
//                 ...state,
//                 [action.payload.prop]: action.payload.value // ES6 object key interpolation
//             };
//         case EMPLOYEE_CREATE:
//             return initialState;
//         default:
//             return state;
//     }
// };
