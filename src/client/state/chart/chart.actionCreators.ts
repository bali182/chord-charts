import { ArrangementItem, BarModel, ChartModel, SectionModel } from '../../../common/Model'
import {
  UpdateChartAction,
  ChartActionType,
  AddSectionAction,
  AddBarAction,
  AddArrangementItemAction,
  DeleteSectionAction,
  DeleteArrangementItemAction,
  DeleteBarAction,
  UpdateSectionAction,
  UpdateBarAction,
  UpdateArrangementItemAction,
} from './chart.actionTypes'

export function updateChart(chart: ChartModel): UpdateChartAction {
  return {
    type: ChartActionType.UPDATE_CHART,
    chart,
  }
}

export function addSection(): AddSectionAction {
  return {
    type: ChartActionType.ADD_SECTION,
  }
}

export function addBar(sectionId: string): AddBarAction {
  return {
    type: ChartActionType.ADD_BAR,
    sectionId,
  }
}

export function addArrangementItem(item: ArrangementItem): AddArrangementItemAction {
  return {
    type: ChartActionType.ADD_ARRANGEMENT_ITEM,
    item,
  }
}

export function deleteSection(sectionId: string): DeleteSectionAction {
  return {
    type: ChartActionType.DELETE_SECTION,
    sectionId,
  }
}

export function deleteBar(barId: string): DeleteBarAction {
  return {
    type: ChartActionType.DELETE_BAR,
    barId,
  }
}

export function deleteArrangementItem(itemId: string): DeleteArrangementItemAction {
  return {
    type: ChartActionType.DELETE_ARRANGEMENT_ITEM,
    itemId,
  }
}

export function updateSection(section: SectionModel): UpdateSectionAction {
  return {
    type: ChartActionType.UPDATE_SECTION,
    section,
  }
}

export function updateBar(bar: BarModel): UpdateBarAction {
  return {
    type: ChartActionType.UPDATE_BAR,
    bar,
  }
}

export function updateArrangementItem(item: ArrangementItem): UpdateArrangementItemAction {
  return {
    type: ChartActionType.UPDATE_ARRANGEMENT_ITEM,
    item,
  }
}
