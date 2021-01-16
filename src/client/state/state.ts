import { ChartModel } from '../../common/Model'
import { SelectionModel } from '../../common/Selection'
import { Theme } from '../../common/Theme'

export type ChordChartAppState = {
  chart: ChartModel
  theme: Theme
  selection: SelectionModel
}
