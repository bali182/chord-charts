import React, { PureComponent } from 'react'
import { EditorField } from './EditorField'
import { EditorString } from './EditorString'
import { EditorPadding } from './EditorPadding'
import { BarModel } from '../model/Model'

export type BarEditorProps = {
  bar: BarModel
  onChange: (model: BarModel) => void
}

export class BarEditor extends PureComponent<BarEditorProps> {
  private onLabelChange = (label: string) => {
    const { onChange, bar } = this.props
    onChange({ ...bar, label })
  }
  private onChordChange = (chord: string) => {
    const { onChange, bar } = this.props
    onChange({ ...bar, chord })
  }

  private renderLabelEditor() {
    const { bar } = this.props
    return (
      <EditorField name="Label" description="Short (optional) label for describing the bar (eg.: riff played here)">
        <EditorString value={bar.label} onChange={this.onLabelChange} />
      </EditorField>
    )
  }

  private renderChordEditor() {
    const { bar } = this.props
    return (
      <EditorField name="Chord(s)" description="Chord or chords played in this bar">
        <EditorString value={bar.chord} onChange={this.onChordChange} />
      </EditorField>
    )
  }

  render() {
    return (
      <EditorPadding>
        {this.renderChordEditor()}
        {this.renderLabelEditor()}
      </EditorPadding>
    )
  }
}
