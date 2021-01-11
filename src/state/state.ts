import { Model } from '../model/Model'
import { SelectionModel } from '../model/Selection'
import { Theme } from '../model/Theme'

export type ChordChartAppState = {
  chart: Model
  theme: Theme
  selection: SelectionModel
}
