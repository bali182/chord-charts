import { BarModel, Model, SectionModel } from '../model'
import { SectionTheme, Theme } from '../Theme'
import { isNil, range, sum } from '../utils'
import Color from 'color'
import { createRoundedRectPath } from './svgUtils'

export class Controller {
  private readonly model: Model
  private readonly theme: Theme

  constructor(model: Model, theme: Theme) {
    this.model = model
    this.theme = theme
  }

  public readonly section = {
    getThemes: (): SectionTheme[] => {
      return this.getTheme().sectionThemes
    },
    getDefaultTheme: (): Required<SectionTheme> => {
      return this.getTheme().defaultSectionTheme
    },
    getTheme: (section: SectionModel): Required<SectionTheme> => {
      const defaultTheme = this.section.getDefaultTheme()
      if (isNil(section.theme)) {
        return defaultTheme
      }
      const theme = this.section.getThemes().find((theme) => theme.name === section.theme)
      if (isNil(theme)) {
        return defaultTheme
      }
      return {
        ...defaultTheme,
        ...theme,
      }
    },
    getX: (section: SectionModel): number => {
      const theme = this.getTheme()
      return theme.spacing
    },
    getY: (section: SectionModel): number => {
      const theme = this.getTheme()
      const sections = this.getModel().sections
      const sectionIndex = sections.indexOf(section)
      return range(0, sectionIndex)
        .map((idx) => this.section.getHeight(sections[idx]) + theme.spacing)
        .reduce(sum, theme.spacing)
    },
    getHeight: (section: SectionModel): number => {
      const theme = this.section.getTheme(section)
      return Math.ceil(section.bars.length / section.groupBars) * theme.barHeight
    },
    getWidth: (section: SectionModel): number => {
      const theme = this.getTheme()
      return theme.width - theme.spacing * 2
    },

    getContrastColor: (section: SectionModel): string => {
      const theme = this.section.getTheme(section)
      const color = new Color(theme.color)
      const [r, g, b] = color.rgb().array()
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#ffffff'
    },
  }

  public readonly bar = {
    getText: (bar: BarModel): string => {
      if (isNil(bar) || isNil(bar.chords) || bar.chords.length === 0) {
        return '-'
      }
      return bar.chords.join(' / ')
    },

    getFontSize: (section: SectionModel): number => {
      return this.section.getTheme(section).barHeight / 2.5
    },

    getKey: (section: SectionModel, bar: BarModel): string => {
      return `${this.bar.getText(bar)}-${section.bars.indexOf(bar)}`
    },

    getX: (section: SectionModel, bar: BarModel): number => {
      const index = section.bars.indexOf(bar)
      return (index % section.groupBars) * this.bar.getWidth(section)
    },

    getY: (section: SectionModel, bar: BarModel): number => {
      const index = section.bars.indexOf(bar)
      return Math.floor(index / section.groupBars) * this.bar.getHeight(section)
    },

    getWidth: (section: SectionModel): number => {
      return this.section.getWidth(section) / section.groupBars
    },

    getHeight: (section: SectionModel): number => {
      return this.section.getTheme(section).barHeight
    },
    getHighlightPath: (section: SectionModel, bar: BarModel): string => {
      const theme = this.section.getTheme(section)
      const barWidth = this.bar.getWidth(section)
      const barHeight = this.bar.getHeight(section)
      const index = section.bars.indexOf(bar)
      const isFirstInRow = index % section.groupBars === 0
      const isLastInRow = index % section.groupBars === 3

      const fullSpacing = theme.spacing
      const halfSpacing = fullSpacing / 2

      const x = isFirstInRow ? fullSpacing : halfSpacing
      const y = fullSpacing
      const width = barWidth - (isFirstInRow ? fullSpacing + halfSpacing : isLastInRow ? 2 * fullSpacing : fullSpacing)
      const height = barHeight - 2 * fullSpacing

      // TODO not hardcode 10
      return createRoundedRectPath(x, y, width, height, 10, 10, 10, 10)
    },
  }

  public getModel(): Model {
    return this.model
  }

  public getTheme(): Theme {
    return this.theme
  }
}
