import React, { Fragment, PureComponent } from 'react'
import { css } from 'emotion'
import { ContextProviderWrapper } from '../ContextProviderWrapper'
import { ChordChartContext, ChordChartContextType } from '../chordChart/ChordChartContext'
import { createVideo } from '../requests'
import { isNil } from '../../common/utils'

const exporterViewStyle = css({
  height: '100vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  backgroundColor: '#fff',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
})

const buttonStyle = css({
  label: 'button',
  background: '#444',
  fontWeight: 'bold',
  fontSize: '16px',
  borderRadius: '28px',
  border: 'none',
  cursor: 'pointer',
  color: '#ffffff',
  padding: '16px 31px',
  textDecoration: 'none',
  outline: 'none',
  whiteSpace: 'nowrap',
  transition: 'all .4s cubic-bezier(0.175, 0.885, 0, 1)',
  ':disabled': {
    background: '#666',
    color: '#eee',
  },
  marginBottom: '20px',
})

type ExportVideoViewState = {
  isLoading: boolean
  isError: boolean
  downloadLink: string
}

export class ExportVideoView extends PureComponent<{}, ExportVideoViewState> {
  state: ExportVideoViewState = {
    isLoading: false,
    isError: false,
    downloadLink: null,
  }

  onSuccess = (link: string) => {
    this.setState({ downloadLink: link, isLoading: false, isError: false })
  }

  onFailure = (e: Error) => {
    console.error(e)
    this.setState({ downloadLink: null, isLoading: false, isError: true })
  }

  doExport = ({ chart, theme }: ChordChartContextType) => () => {
    this.setState({ isLoading: true, isError: false })
    createVideo({ chart, theme }).then(this.onSuccess).catch(this.onFailure)
  }

  renderInformation() {
    const { downloadLink, isError, isLoading } = this.state
    if (!isNil(downloadLink) && !isLoading) {
      return (
        <span>
          Click to <a href={downloadLink}>Download</a> video
        </span>
      )
    }
    if (isLoading) {
      return <span>Generating your video... It may take up to a few minutes depending on your input.</span>
    }
    if (isError) {
      return <span>Something went wrong while creating your video!</span>
    }
  }

  render() {
    return (
      <div className={exporterViewStyle}>
        <ContextProviderWrapper>
          <ChordChartContext.Consumer>
            {(context) => {
              const { isLoading } = this.state
              return (
                <Fragment>
                  <button className={buttonStyle} disabled={isLoading} onClick={this.doExport(context)}>
                    {isLoading ? 'Creating your video...' : 'Create video'}
                  </button>
                  {this.renderInformation()}
                </Fragment>
              )
            }}
          </ChordChartContext.Consumer>
        </ContextProviderWrapper>
      </div>
    )
  }
}
