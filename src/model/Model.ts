export type TimeSignature = {
  upper: number
  lower: number
}

export type BarModel = {
  id: string
  chord: string
  label?: string
}

export type SectionModel = {
  id: string
  name: string
  bars: BarModel[]
  groupBars: number
}

export type Model = {
  id: string
  name: string
  bpm: number
  key: string
  timeSignature: TimeSignature
  sections: SectionModel[]
  arrangement: ArrangementItem[]
}

export type ArrangementSection = {
  type: 'arrangement-section'
  sectionId: string
  id: string
}

export type ArrangementIdle = {
  type: 'arrangement-idle'
  length: number
  id: string
}

export type ArrangementItem = ArrangementIdle | ArrangementSection

export function isArrangementIdle(input: ArrangementItem): input is ArrangementIdle {
  return input.type === 'arrangement-idle'
}

export function isArrangementSection(input: ArrangementItem): input is ArrangementSection {
  return input.type === 'arrangement-section'
}
