import { SelectionModel } from '../../../common/Selection'

export enum SelectionActionType {
  SET_SELECTION = 'SET_SELECTION',
  UNSET_SELECTION = 'UNSET_SELECTION',
}

export type SetSelectionPayload = {
  selection: SelectionModel
}

export type SetSelectionAction = {
  type: SelectionActionType.SET_SELECTION
  payload: SetSelectionPayload
}

export type SelectionAction = SetSelectionAction
