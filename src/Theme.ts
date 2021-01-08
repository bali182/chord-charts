export type SectionTheme = Partial<{
  name: string
  barHeight: number
  spacing: number
  radius: number
  strokeWidth: number
  color: string
}>

export type Theme = {
  width: number
  height: number
  spacing: number
  defaultSectionTheme: Required<SectionTheme>
  sectionThemes: SectionTheme[]
}
