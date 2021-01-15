import React, { PureComponent } from 'react'
import { ChordChartContext, ChordChartContextType } from './ChordChartContext'
import { Header } from './Header'
import { Section } from './Section'
import { Theme } from '../../common/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { css } from 'emotion'

const containerStyle = (theme: Theme, readOnly: boolean): React.CSSProperties => ({
  position: 'relative',
  overflow: readOnly ? 'hidden' : null,
  height: readOnly ? theme.height : 'auto',
  width: theme.width,
  padding: theme.spacing,
  flexShrink: 0,
})

const outlineStyle = (theme: Theme) =>
  css({
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: theme.height,
    width: theme.width,
    border: '1px dashed lightgray',
    flexShrink: 0,
    pointerEvents: 'none',
  })

const appendStyle = (theme: Theme): React.CSSProperties => ({
  overflow: 'hidden',
  padding: theme.section.spacing,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  border: '1px dashed lightgray',
  cursor: 'pointer',
  borderRadius: theme.section.radius,
})

export class ChordChart extends PureComponent {
  private renderSections({ chart }: ChordChartContextType) {
    return chart.sections.map((section) => <Section key={section.id} section={section} />)
  }

  private renderAppendSection({ theme, readOnly, addSection }: ChordChartContextType) {
    if (readOnly) {
      return null
    }
    return (
      <div style={appendStyle(theme)} onClick={addSection}>
        <FontAwesomeIcon icon={faPlus} size={'2x'} />
        <span style={{ marginLeft: theme.section.spacing }}>Add song section</span>
      </div>
    )
  }

  render() {
    return (
      <ChordChartContext.Consumer>
        {(context) => (
          <div style={containerStyle(context.theme, context.readOnly)}>
            <Header />
            {this.renderSections(context)}
            {this.renderAppendSection(context)}
            <div className={outlineStyle(context.theme)} />
          </div>
        )}
      </ChordChartContext.Consumer>
    )
  }
}
