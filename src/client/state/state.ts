import { Model } from '../../common/Model'
import { SelectionModel } from '../../common/Selection'
import { Theme } from '../../common/Theme'

export type ChordChartAppState = {
  chart: Model
  theme: Theme
  selection: SelectionModel
}
