export type BarModel = {
  id: string
  chords: string[]
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
  sections: SectionModel[]
  sectionSequence: string[]
}
