import { Base } from '../utils'

export const TODO_SET_COMPLETE = 'todo item set as complete'
export const TODO_SET_COMPLETE_SUCCESS = 'todo item set as complete succeeded'
export const TODO_SET_COMPLETE_FAILED = 'todo item set as complete failed'

export const GrownodeTodoListItemSetComplete = (GrownodeId, GrownodeTodoItemId) => {
  return (dispatch, getState) => {
    dispatch({ type: TODO_SET_COMPLETE })

    return Base.update(`grownodes/${GrownodeId}/todos_complete/${GrownodeTodoItemId}`, {
      data: {
        ...getState().grownodes[GrownodeId].todo_list[GrownodeTodoItemId],
        completed_at: new Date()
      }
    })
    .then(() => {
      Base.remove(`grownodes/${GrownodeId}/todo_list/${GrownodeTodoItemId}`)
      .then(() => {
        // Everything worked out
        return dispatch({
          type: TODO_SET_COMPLETE_SUCCESS,
          payload: { GrownodeId, GrownodeTodoItemId: GrownodeTodoItemId }
        })
      })
    })
    .catch(error => {
      dispatch({ type: TODO_SET_COMPLETE_FAILED, payload: error })
    })
  }
}
