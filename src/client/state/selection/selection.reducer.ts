import { SelectionAction, SelectionActionType } from './selection.actionTypes'
import { SelectionModel } from '../../../common/Selection'

export function selectionReducer(state: SelectionModel = null, action: SelectionAction): SelectionModel {
  switch (action.type) {
    case SelectionActionType.SET_SELECTION:
      const { selection } = action
      return selection
    default:
      return state
  }
}
