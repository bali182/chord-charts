export type BarSelection = {
  type: 'bar-selection'
  id: string
}

export type SectionSelection = {
  type: 'section-selection'
  id: string
}

export type ArrangementItemSelection = {
  type: 'arrangement-selection'
  id: string
}

export type ChordChartSelection = {
  type: 'chord-chart-selection'
}

export type ThemeSelection = {
  type: 'theme-selection'
}

export type SelectionModel =
  | BarSelection
  | SectionSelection
  | ChordChartSelection
  | ThemeSelection
  | ArrangementItemSelection

export function isBarSelection(sel: SelectionModel): sel is BarSelection {
  return sel.type === 'bar-selection'
}
export function isSectionSelection(sel: SelectionModel): sel is SectionSelection {
  return sel.type === 'section-selection'
}
export function isChordChartSelection(sel: SelectionModel): sel is ChordChartSelection {
  return sel.type === 'chord-chart-selection'
}
export function isThemeSelection(sel: SelectionModel): sel is ThemeSelection {
  return sel.type === 'theme-selection'
}
export function isArrangementItemSection(sel: SelectionModel): sel is ArrangementItemSelection {
  return sel.type === 'arrangement-selection'
}
