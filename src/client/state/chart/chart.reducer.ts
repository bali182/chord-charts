import { ChartAction, ChartActionType } from './chart.actionTypes'
import { Model } from '../../../common/Model'
// import { createEmptyChart } from './createEmptyChart'
import { sampleModel } from '../../../common/sampleModel'

export function chartReducer(state: Model = sampleModel, action: ChartAction): Model {
  switch (action.type) {
    case ChartActionType.UPDATE_CHART:
      const { payload } = action
      return payload.chart
    default:
      return state
  }
}
