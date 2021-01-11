import { createContext } from 'react'
import { Model } from '../model/Model'
import { SelectionModel } from '../model/Selection'
import { Theme } from '../model/Theme'

export type ChordChartContextType = {
  theme: Theme
  chart: Model
  selection: SelectionModel
  readOnly: boolean

  addSection?: () => void
  addBar?: (sectionId: string) => void
  moveSectionUp?: (sectionId: string) => void
  moveSectionDown?: (sectionId: string) => void
  deleteSection?: (sectionId: string) => void
  deleteBar?: (barId: string) => void
  setSelection?: (sel: SelectionModel) => void
}

export const ChordChartContext = createContext<ChordChartContextType>(null)
