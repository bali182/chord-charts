import { SelectionAction, SelectionActionType } from './selection.actionTypes'
import { SelectionModel } from '../../../common/Selection'

export function selectionReducer(state: SelectionModel = null, action: SelectionAction): SelectionModel {
  switch (action.type) {
    case SelectionActionType.SET_SELECTION:
      const { payload } = action
      return payload.selection
    default:
      return state
  }
}
