import { Model } from './model'
import { Theme } from './Theme'

export const sampleTheme: Theme = {
  width: 1280,
  height: 720,
  spacing: 20,
  defaultSectionTheme: {
    barHeight: 100,
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

export const sampleModel: Model = {
  name: 'Sample model',
  sections: [
    {
      name: 'Verse',
      groupBars: 4,
      bars: [
        { chords: ['Am'] },
        { chords: ['D'] },
        { chords: ['F'] },
        { chords: ['G'] },
        { chords: ['Am'] },
        { chords: ['D'] },
      ],
      theme: 'teal',
    },
    {
      name: 'PreChorus',
      groupBars: 4,
      bars: [{ chords: ['D'] }, { chords: ['F7'] }],
      theme: 'blue',
    },
    {
      name: 'Chorus',
      groupBars: 4,
      bars: [{ chords: ['D'] }, { chords: ['F'] }, { chords: ['C'] }, { chords: ['G'] }],
      theme: 'purple',
    },
  ],
  sectionSequence: ['Verse', 'PreChorus', 'Chorus', 'Verse', 'PreChorus', 'Chorus'],
}
