import React, { PureComponent } from 'react'
import { EditorField } from '../ux/EditorField'
import { EditorString } from '../ux/EditorString'
import { BarModel } from '../model/Model'

export type BarEditorProps = {
  value: BarModel
  onChange: (model: BarModel) => void
}

export class BarEditor extends PureComponent<BarEditorProps> {
  private onLabelChange = (label: string) => {
    const { onChange, value: bar } = this.props
    onChange({ ...bar, label })
  }
  private onChordChange = (chord: string) => {
    const { onChange, value: bar } = this.props
    onChange({ ...bar, chord })
  }

  private renderLabelEditor() {
    const { value: bar } = this.props
    return (
      <EditorField name="Label" description="Short (optional) label for describing the bar (eg.: riff played here)">
        <EditorString value={bar.label} onChange={this.onLabelChange} />
      </EditorField>
    )
  }

  private renderChordEditor() {
    const { value: bar } = this.props
    return (
      <EditorField name="Chord(s)" description="Chord or chords played in this bar">
        <EditorString value={bar.chord} onChange={this.onChordChange} />
      </EditorField>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderChordEditor()}
        {this.renderLabelEditor()}
      </React.Fragment>
    )
  }
}
