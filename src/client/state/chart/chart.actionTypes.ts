import { ArrangementItem, BarModel, ChartModel, SectionModel } from '../../../common/Model'

export enum ChartActionType {
  ADD_SECTION = 'ADD_SECTION',
  ADD_BAR = 'ADD_BAR',
  ADD_ARRANGEMENT_ITEM = 'ADD_ARRANGEMENT_ITEM',
  DELETE_SECTION = 'DELETE_SECTION',
  DELETE_BAR = 'DELETE_BAR',
  DELETE_ARRANGEMENT_ITEM = 'DELETE_ARRANGEMENT_ITEM',
  UPDATE_CHART = 'UPDATE_CHART',
  UPDATE_SECTION = 'UPDATE_SECTION',
  UPDATE_BAR = 'UPDATE_BAR',
  UPDATE_ARRANGEMENT_ITEM = 'UPDATE_ARRANGEMENT_ITEM',
}

export type AddSectionAction = {
  type: ChartActionType.ADD_SECTION
}

export type AddBarAction = {
  type: ChartActionType.ADD_BAR
  sectionId: string
}

export type AddArrangementItemAction = {
  type: ChartActionType.ADD_ARRANGEMENT_ITEM
  item: ArrangementItem
}

export type DeleteSectionAction = {
  type: ChartActionType.DELETE_SECTION
  sectionId: string
}

export type DeleteBarAction = {
  type: ChartActionType.DELETE_BAR
  barId: string
}

export type DeleteArrangementItemAction = {
  type: ChartActionType.DELETE_ARRANGEMENT_ITEM
  itemId: string
}

export type UpdateChartAction = {
  type: ChartActionType.UPDATE_CHART
  chart: ChartModel
}

export type UpdateSectionAction = {
  type: ChartActionType.UPDATE_SECTION
  section: SectionModel
}

export type UpdateBarAction = {
  type: ChartActionType.UPDATE_BAR
  bar: BarModel
}

export type UpdateArrangementItemAction = {
  type: ChartActionType.UPDATE_ARRANGEMENT_ITEM
  item: ArrangementItem
}

export type ChartAction =
  | AddSectionAction
  | AddBarAction
  | AddArrangementItemAction
  | DeleteSectionAction
  | DeleteBarAction
  | DeleteArrangementItemAction
  | UpdateChartAction
  | UpdateSectionAction
  | UpdateBarAction
  | UpdateArrangementItemAction
