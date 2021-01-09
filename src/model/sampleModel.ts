import { Model, SectionModel } from './Model'
import { Theme } from './Theme'
import { nanoid } from 'nanoid'

export const sampleTheme: Theme = {
  width: 1280,
  height: 720,
  spacing: 20,
  defaultSectionTheme: {
    barHeight: 90,
    name: 'default',
    color: 'black',
    radius: 15,
    spacing: 20,
    strokeWidth: 3,
  },
  sectionThemes: [
    { name: 'teal', color: '#107E7D' },
    { name: 'purple', color: '#610345' },
    { name: 'blue', color: '#044B7F' },
  ],
}

export const VerseSection: SectionModel = {
  id: nanoid(5),
  name: 'Verse',
  groupBars: 4,
  bars: [
    { id: nanoid(5), chords: ['Am'] },
    { id: nanoid(5), chords: ['D'] },
    { id: nanoid(5), chords: ['F'] },
    { id: nanoid(5), chords: ['G'], label: 'second inversion' },
    { id: nanoid(5), chords: ['Am'] },
    { id: nanoid(5), chords: ['D'], label: 'triad only' },
  ],
  theme: 'teal',
}

export const PreChorusSection: SectionModel = {
  id: nanoid(5),
  name: 'PreChorus',
  groupBars: 4,
  bars: [
    { id: nanoid(5), chords: ['D'] },
    { id: nanoid(5), chords: ['F7'] },
  ],
  theme: 'blue',
}

export const ChorusSection: SectionModel = {
  id: nanoid(5),
  name: 'Chorus',
  groupBars: 4,
  bars: [
    { id: nanoid(5), chords: ['D'] },
    { id: nanoid(5), chords: ['F'] },
    { id: nanoid(5), chords: ['C'] },
    { id: nanoid(5), chords: ['G'] },
  ],
  theme: 'purple',
}

export const sampleModel: Model = {
  id: nanoid(5),
  name: 'Sample model',
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
