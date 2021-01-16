import { ChartAction, ChartActionType } from './chart.actionTypes'
import { ChartModel, isArrangementSection } from '../../../common/Model'
// import { createEmptyChart } from './createEmptyChart'
import { sampleModel } from '../../../common/sampleModel'
import { id } from '../../../common/utils'

export function chartReducer(state: ChartModel = sampleModel, action: ChartAction): ChartModel {
  switch (action.type) {
    case ChartActionType.ADD_SECTION: {
      return {
        ...state,
        sections: state.sections.concat([
          {
            id: id(),
            bars: [],
            groupBars: 4,
            name: `Section ${state.sections.length + 1}`,
          },
        ]),
      }
    }
    case ChartActionType.ADD_BAR: {
      const { sectionId } = action
      return {
        ...state,
        sections: state.sections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              bars: section.bars.concat([
                {
                  chord: '%',
                  id: id(),
                  label: null,
                },
              ]),
            }
          }
          return section
        }),
      }
    }
    case ChartActionType.ADD_ARRANGEMENT_ITEM: {
      const { item } = action
      return {
        ...state,
        arrangement: state.arrangement.concat(item),
      }
    }
    case ChartActionType.DELETE_SECTION: {
      const { sectionId } = action
      return {
        ...state,
        sections: state.sections.filter((section) => section.id !== sectionId),
        arrangement: state.arrangement.filter((item) => !(isArrangementSection(item) && item.sectionId === sectionId)),
      }
    }
    case ChartActionType.DELETE_BAR: {
      const { barId } = action
      return {
        ...state,
        sections: state.sections.map((section) => ({
          ...section,
          bars: section.bars.filter((b) => b.id !== barId),
        })),
      }
    }
    case ChartActionType.DELETE_ARRANGEMENT_ITEM: {
      const { itemId } = action
      return {
        ...state,
        arrangement: state.arrangement.filter((item) => item.id !== itemId),
      }
    }
    case ChartActionType.UPDATE_CHART: {
      const { chart } = action
      return chart
    }
    case ChartActionType.UPDATE_SECTION: {
      const { section } = action
      return {
        ...state,
        sections: state.sections.map((s) => (s.id === section.id ? section : s)),
      }
    }
    case ChartActionType.UPDATE_BAR: {
      const { bar } = action
      return {
        ...state,
        sections: state.sections.map((s) => ({
          ...s,
          bars: s.bars.map((b) => (b.id === bar.id ? bar : b)),
        })),
      }
    }
    case ChartActionType.UPDATE_ARRANGEMENT_ITEM: {
      const { item } = action
      return {
        ...state,
        arrangement: state.arrangement.map((i) => (i.id === item.id ? item : i)),
      }
    }
    default:
      return state
  }
}
