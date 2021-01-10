import { Model, SectionModel } from './Model'
import { Theme } from './Theme'
import { id } from '../chart/utils'

export const sampleTheme: Theme = {
  width: 1280,
  height: 720,
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
  id: id(),
  name: 'Verse',
  groupBars: 4,
  bars: [
    { id: id(), chords: ['Am'] },
    { id: id(), chords: ['D'] },
    { id: id(), chords: ['F'] },
    { id: id(), chords: ['G'], label: 'second inversion' },
    { id: id(), chords: ['Am'] },
    { id: id(), chords: ['D'], label: 'triad only' },
  ],
}

export const PreChorusSection: SectionModel = {
  id: id(),
  name: 'PreChorus',
  groupBars: 4,
  bars: [
    { id: id(), chords: ['D'] },
    { id: id(), chords: ['F7'] },
  ],
}

export const ChorusSection: SectionModel = {
  id: id(),
  name: 'Chorus',
  groupBars: 4,
  bars: [
    { id: id(), chords: ['D'] },
    { id: id(), chords: ['F'] },
    { id: id(), chords: ['C'] },
    { id: id(), chords: ['G'] },
  ],
}

export const sampleModel: Model = {
  id: id(),
  name: 'Sample model',
  bpm: 120,
  key: 'A minor',
  sections: [VerseSection, PreChorusSection, ChorusSection],
  sectionSequence: [
    VerseSection.id,
    PreChorusSection.id,
    ChorusSection.id,
    VerseSection.id,
    PreChorusSection.id,
    ChorusSection.id,
  ],
}
