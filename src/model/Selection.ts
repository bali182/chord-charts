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

export type Selection = BarSelection | SectionSelection | ChordChartSelection

export function isBarSelection(sel: Selection): sel is BarSelection {
  return sel.type === 'bar-selection'
}
export function isSectionSelection(sel: Selection): sel is SectionSelection {
  return sel.type === 'section-selection'
}
export function isChordChartSelection(sel: Selection): sel is ChordChartSelection {
  return sel.type === 'chord-chart-selection'
}
