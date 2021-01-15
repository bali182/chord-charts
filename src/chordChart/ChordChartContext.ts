import { createContext } from 'react'
import { ArrangementItem, BarModel, Model, SectionModel } from '../model/Model'
import { SelectionModel } from '../model/Selection'
import { Theme } from '../model/Theme'

export type ChordChartContextType = {
  theme: Theme
  chart: Model
  selection: SelectionModel
  readOnly: boolean

  addSection?: () => void
  addBar?: (sectionId: string) => void
  addArrangementItem?: (item: ArrangementItem) => void
  moveSectionUp?: (sectionId: string) => void
  moveSectionDown?: (sectionId: string) => void
  deleteSection?: (sectionId: string) => void
  deleteBar?: (barId: string) => void
  deleteArrangementItem?: (itemId: string) => void
  setSelection?: (sel: SelectionModel) => void
  updateSection?: (section: SectionModel) => void
  updateBar?: (section: BarModel) => void
  updateChart?: (chart: Model) => void
  updateArrangementItem?: (item: ArrangementItem) => void
}

export const ChordChartContext = createContext<ChordChartContextType>(null)
