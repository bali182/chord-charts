import { SelectionModel } from '../../../common/Selection'

export enum SelectionActionType {
  SET_SELECTION = 'SET_SELECTION',
  UNSET_SELECTION = 'UNSET_SELECTION',
}


export type SetSelectionAction = {
  type: SelectionActionType.SET_SELECTION
  selection: SelectionModel
}

export type SelectionAction = SetSelectionAction
