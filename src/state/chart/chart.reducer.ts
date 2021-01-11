import { ChartAction, ChartActionType } from './chart.actionTypes'
import { Model } from '../../model/Model'
import { createEmptyChart } from './createEmptyChart'

export function chartReducer(state: Model = createEmptyChart(), action: ChartAction): Model {
  switch (action.type) {
    case ChartActionType.UPDATE_CHART:
      const { payload } = action
      return payload.chart
    default:
      return state
  }
}
