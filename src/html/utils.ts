import { SectionModel } from '../model/Model'
import { Theme } from '../model/Theme'
import { isNil } from '../utils'

export function getSectionTheme(theme: Theme, section: SectionModel) {
  const defaultTheme = theme.defaultSectionTheme
  if (isNil(section.theme)) {
    return defaultTheme
  }
  const sTheme = theme.sectionThemes.find((theme) => theme.name === section.theme)
  if (isNil(sTheme)) {
    return defaultTheme
  }
  return {
    ...defaultTheme,
    ...sTheme,
  }
}
