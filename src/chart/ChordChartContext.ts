import { createContext } from 'react'
import { Model } from '../model/Model'
import { SelectionModel } from '../model/Selection'
import { Theme } from '../model/Theme'

export type ChordChartContextType = {
  theme: Theme
  model: Model
  selection: SelectionModel
}

export const ChordChartContext = createContext<ChordChartContextType>({
  model: null,
  theme: null,
  selection: null,
})
