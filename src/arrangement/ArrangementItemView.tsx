import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { ChordChartContext, ChordChartContextType } from '../chart/ChordChartContext'
import { getContrastColor, getSectionColor } from '../chart/utils'
import { ArrangementItem, isArrangementSection } from '../model/Model'
import { isArrangementItemSection } from '../model/Selection'
import { barToMs, isNil } from '../utils'
import { EditorPopover } from '../ux/EditorPopover'

type ArrangementItemViewProps = {
  item: ArrangementItem
}

type ArrangementItemViewState = {
  isMouseOver: boolean
}

const sectionStyle = (color: string, textColor: string, ms: number) =>
  css({
    padding: '10px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    cursor: 'pointer',
    borderRadius: '10px',
    backgroundColor: color,
    color: textColor,
    textAlign: 'center',
    width: `${(ms / 1000) * 15}px`,
    marginRight: '10px',
    ':last-of-type': {
      marginRight: '0px',
    },
  })

export class ArrangementItemView extends PureComponent<ArrangementItemViewProps, ArrangementItemViewState> {
  state: ArrangementItemViewState = {
    isMouseOver: false,
  }

  private onMouseEnter = () => this.setState({ isMouseOver: true })
  private onMouseLeave = () => this.setState({ isMouseOver: false })

  private getColor({ chart, theme, setSelection }: ChordChartContextType, item: ArrangementItem): string {
    if (isArrangementSection(item)) {
      return getSectionColor(
        theme,
        chart.sections.findIndex((s) => s.id === item.sectionId)
      )
    } else {
      return 'lightgray'
    }
  }

  private getTextColor(context: ChordChartContextType, item: ArrangementItem): string {
    if (isArrangementSection(item)) {
      return getContrastColor(this.getColor(context, item))
    } else {
      return '#333'
    }
  }

  private getLength({ chart }: ChordChartContextType, item: ArrangementItem): number {
    if (isArrangementSection(item)) {
      const barLength = barToMs(chart.bpm, chart.timeSignature)
      const section = chart.sections.find((s) => s.id === item.sectionId)
      return barLength * section.bars.length
    } else {
      return item.length
    }
  }

  private getLabel({ chart }: ChordChartContextType, item: ArrangementItem): string {
    if (isArrangementSection(item)) {
      const section = chart.sections.find((s) => s.id === item.sectionId)
      return section.name
    } else {
      return '-'
    }
  }

  render() {
    const { item } = this.props
    return (
      <ChordChartContext.Consumer>
        {(context) => {
          const { setSelection } = context
          const isActive =
            !isNil(context.selection) && isArrangementItemSection(context.selection) && context.selection.id === item.id
          return (
            <EditorPopover
              isOpen={isActive}
              passThrough={false}
              title="Edit song section"
              onClose={() => setSelection(null)}
              render={() => <div />}>
              <div
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onClick={() => setSelection({ type: 'arrangement-selection', id: item.id })}
                className={sectionStyle(
                  this.getColor(context, item),
                  this.getTextColor(context, item),
                  this.getLength(context, item)
                )}>
                {this.getLabel(context, item)}
              </div>
            </EditorPopover>
          )
        }}
      </ChordChartContext.Consumer>
    )
  }
}
