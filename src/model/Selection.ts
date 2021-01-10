export type BarSelection = {
  type: 'bar-selection'
  id: string
}

export type SectionSelection = {
  type: 'section-selection'
  id: string
}

export type ChordChartSelection = {
  type: 'chord-chart-selection'
  id: string
}

export type SelectionModel = BarSelection | SectionSelection | ChordChartSelection

export function isBarSelection(sel: SelectionModel): sel is BarSelection {
  return sel.type === 'bar-selection'
}
export function isSectionSelection(sel: SelectionModel): sel is SectionSelection {
  return sel.type === 'section-selection'
}
export function isChordChartSelection(sel: SelectionModel): sel is ChordChartSelection {
  return sel.type === 'chord-chart-selection'
}
