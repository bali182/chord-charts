import { ChartModel, SectionModel } from './Model'
import { Theme } from './Theme'

export const sampleTheme: Theme = {
  width: 1920,
  height: 1080,
  spacing: 20,
  section: {
    barHeight: 90,
    radius: 15,
    spacing: 20,
    strokeWidth: 3,
    opacity: 0.9,
    colors: ['#107E7D', '#610345', '#044B7F'],
  },
}

export const VerseSection: SectionModel = {
  id: 'verse',
  name: 'Verse',
  groupBars: 4,
  bars: [
    { id: '1', chord: 'Am' },
    { id: '2', chord: 'D' },
    { id: '3', chord: 'F' },
    { id: '4', chord: 'G', label: 'second inversion' },
    { id: '5', chord: 'Am' },
    { id: '6', chord: 'D', label: 'triad only' },
  ],
}

export const PreChorusSection: SectionModel = {
  id: 'pre-chorus',
  name: 'PreChorus',
  groupBars: 4,
  bars: [
    { id: '7', chord: 'D' },
    { id: '8', chord: 'F7' },
  ],
}

export const ChorusSection: SectionModel = {
  id: 'chorus',
  name: 'Chorus',
  groupBars: 4,
  bars: [
    { id: '9', chord: 'D' },
    { id: '10', chord: 'F' },
    { id: '11', chord: 'C' },
    { id: '12', chord: 'G' },
  ],
}

export const sampleModel: ChartModel = {
  id: 'model',
  name: 'Sample model',
  bpm: 120,
  timeSignature: { lower: 4, upper: 4 },
  key: 'A minor',
  sections: [VerseSection, PreChorusSection, ChorusSection],
  arrangement: [
    { id: 'a1', type: 'arrangement-idle', length: 1000 },
    { id: 'a2', type: 'arrangement-section', sectionId: VerseSection.id },
    { id: 'a3', type: 'arrangement-section', sectionId: PreChorusSection.id },
    { id: 'a4', type: 'arrangement-section', sectionId: ChorusSection.id },
    { id: 'a5', type: 'arrangement-section', sectionId: VerseSection.id },
    { id: 'a6', type: 'arrangement-section', sectionId: PreChorusSection.id },
    { id: 'a7', type: 'arrangement-section', sectionId: ChorusSection.id },
    { id: 'a8', type: 'arrangement-idle', length: 4000 },
    { id: 'a9', type: 'arrangement-section', sectionId: VerseSection.id },
    { id: 'a10', type: 'arrangement-section', sectionId: PreChorusSection.id },
    { id: 'a11', type: 'arrangement-section', sectionId: ChorusSection.id },
  ],
}
