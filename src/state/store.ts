import { createStore, combineReducers, compose } from 'redux'
import { ChordChartAppState } from './state'
import { themeReducer } from './theme/theme.reducer'
import { selectionReducer } from './selection/selection.reducer'
import { chartReducer } from './chart/chart.reducer'

const reducers = combineReducers<ChordChartAppState>({
  chart: chartReducer,
  theme: themeReducer,
  selection: selectionReducer,
})

const composeEnhancers: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore<ChordChartAppState, any, any, any>(reducers, composeEnhancers())
