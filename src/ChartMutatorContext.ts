import { createContext } from 'react'
import { SelectionModel } from './model/Selection'

export type ChartMutatorContextType = {
  addSection: () => void
  addBar: (sectionId: string) => void
  moveSectionUp: (sectionId: string) => void
  moveSectionDown: (sectionId: string) => void
  deleteSection: (sectionId: string) => void
  deleteBar: (barId: string) => void
  setSelection: (sel: SelectionModel) => void
}

export const ChartMutatorContext = createContext<ChartMutatorContextType>(null)
