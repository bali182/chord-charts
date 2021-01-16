import { SelectionModel } from '../../../common/Selection'
import { SetSelectionAction, SelectionActionType } from './selection.actionTypes'

export function setSelection(selection: SelectionModel): SetSelectionAction {
  return {
    type: SelectionActionType.SET_SELECTION,
    selection,
  }
}
