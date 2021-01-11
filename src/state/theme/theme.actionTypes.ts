import { Theme } from '../../model/Theme'

export enum ThemeActionType {
  UPDATE_THEME = 'UPDATE_THEME',
}

export type UpdateThemePayload = {
  theme: Theme
}

export type UpdateThemeAction = {
  type: ThemeActionType.UPDATE_THEME
  payload: UpdateThemePayload
}

export type ThemeAction = UpdateThemeAction
