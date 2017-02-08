import { GROWNODES_FETCH_SUCCESS } from '../actions/GrownodesActions'

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case GROWNODES_FETCH_SUCCESS:
            return action.payload
        default:
            return state
    }
}
