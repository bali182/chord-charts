import React, { PureComponent } from 'react'
import { EditorField } from './EditorField'
import { EditorString } from './EditorString'
import { EditorPadding } from './EditorPadding'
import { SectionModel } from '../model/Model'
import { EditorNumber } from './EditorNumber'

export type SectionEditorProps = {
  section: SectionModel
  onChange: (model: SectionModel) => void
}

export class SectionEditor extends PureComponent<SectionEditorProps> {
  private onNameChanged = (name: string) => {
    const { onChange, section } = this.props
    onChange({ ...section, name })
  }
  private onGroupBarsChanged = (groupBars: number) => {
    const { onChange, section } = this.props
    onChange({ ...section, groupBars })
  }

  private renderNameEditor() {
    const { section } = this.props
    return (
      <EditorField name="Name" description="Name of the section (eg.: Verse or Chorus)">
        <EditorString value={section.name} onChange={this.onNameChanged} />
      </EditorField>
    )
  }

  private renderGroupBars() {
    const { section } = this.props
    return (
      <EditorField name="Bars in a row" description="Specify how many bars you want to see in a row, typically 4 or 8">
        <EditorNumber value={section.groupBars} onChange={this.onGroupBarsChanged} />
      </EditorField>
    )
  }

  render() {
    return (
      <EditorPadding>
        {this.renderNameEditor()}
        {this.renderGroupBars()}
      </EditorPadding>
    )
  }
}
