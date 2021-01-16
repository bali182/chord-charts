import React, { PureComponent } from 'react'
import { EditorField } from '../ux/EditorField'
import { EditorString } from '../ux/EditorString'
import { SectionModel } from '../../common/Model'
import { EditorNumber } from '../ux/EditorNumber'

export type SectionEditorProps = {
  value: SectionModel
  onChange: (model: SectionModel) => void
}

export class SectionEditor extends PureComponent<SectionEditorProps> {
  private onNameChanged = (name: string) => {
    const { onChange, value: section } = this.props
    onChange({ ...section, name })
  }
  private onGroupBarsChanged = (groupBars: number) => {
    const { onChange, value: section } = this.props
    onChange({ ...section, groupBars })
  }

  private renderNameEditor() {
    const { value: section } = this.props
    return (
      <EditorField name="Name" description="Name of the section (eg.: Verse or Chorus)">
        <EditorString value={section.name} onChange={this.onNameChanged} />
      </EditorField>
    )
  }

  private renderGroupBars() {
    const { value: section } = this.props
    return (
      <EditorField name="Bars in a row" description="Specify how many bars you want to see in a row, typically 4 or 8">
        <EditorNumber value={section.groupBars} onChange={this.onGroupBarsChanged} />
      </EditorField>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderNameEditor()}
        {this.renderGroupBars()}
      </React.Fragment>
    )
  }
}
