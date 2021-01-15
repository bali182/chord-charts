import { Theme } from '../../../common/Theme'
import { defaultTheme } from './defaultTheme'
import { ThemeAction, ThemeActionType } from './theme.actionTypes'

export function themeReducer(state: Theme = defaultTheme, action: ThemeAction): Theme {
  switch (action.type) {
    case ThemeActionType.UPDATE_THEME:
      return action.payload.theme
    default:
      return state
  }
}
