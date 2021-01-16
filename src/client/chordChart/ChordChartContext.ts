import { createContext } from 'react'
import { ArrangementItem, BarModel, ChartModel, SectionModel } from '../../common/Model'
import { SelectionModel } from '../../common/Selection'
import { Theme } from '../../common/Theme'

export type ChordChartContextType = {
  theme: Theme
  chart: ChartModel
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
  updateChart?: (chart: ChartModel) => void
  updateArrangementItem?: (item: ArrangementItem) => void
}

export const ChordChartContext = createContext<ChordChartContextType>(null)
