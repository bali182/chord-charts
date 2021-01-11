import { Model } from '../../model/Model'

export enum ChartActionType {
  UPDATE_CHART = 'SET_CHART',
}

export type UpdateChartPayload = {
  chart: Model
}

export type UpdateChartAction = {
  type: ChartActionType.UPDATE_CHART
  payload: UpdateChartPayload
}

export type ChartAction = UpdateChartAction
