export type BarModel = {
  id: string
  chords: string[]
  label?: string
}

export type SectionModel = {
  id: string
  name: string
  bars: BarModel[]
  theme: string
  groupBars: number
}

export type Model = {
  id: string
  name: string
  sections: SectionModel[]
  sectionSequence: string[]
}
