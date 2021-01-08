export type BarModel = {
  chords: string[]
}

export type SectionModel = {
  name: string
  bars: BarModel[]
  theme: string
  groupBars: number
}

export type Model = {
  name: string
  sections: SectionModel[]
  sectionSequence: string[]
}
