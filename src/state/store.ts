import { createStore, combineReducers, compose, Store } from 'redux'
import { ChordChartAppState } from './state'
import { themeReducer } from './theme/theme.reducer'
import { selectionReducer } from './selection/selection.reducer'
import { chartReducer } from './chart/chart.reducer'
import { isNil } from '../utils'

const reducers = combineReducers<ChordChartAppState>({
  chart: chartReducer,
  theme: themeReducer,
  selection: selectionReducer,
})

const composeEnhancers: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const preloadedState = JSON.parse(localStorage.getItem('content'))

export const store: Store = isNil(preloadedState)
  ? createStore<ChordChartAppState, any, any, any>(reducers, composeEnhancers())
  : createStore<ChordChartAppState, any, any, any>(reducers, preloadedState, composeEnhancers())

store.subscribe(() => localStorage.setItem('content', JSON.stringify(store.getState(), null, 2)))
