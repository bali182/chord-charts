import { createContext } from 'react'
import { Model } from '../model/Model'
import { Theme } from '../model/Theme'

export type ChordChartContextType = {
  theme: Theme
  model: Model
}

export const ChordChartContext = createContext<ChordChartContextType>({
  model: null,
  theme: null,
})
