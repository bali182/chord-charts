import { UpdateChartAction, UpdateChartPayload, ChartActionType } from './chart.actionTypes'

export function updateChart(payload: UpdateChartPayload): UpdateChartAction {
  return {
    type: ChartActionType.UPDATE_CHART,
    payload,
  }
}
