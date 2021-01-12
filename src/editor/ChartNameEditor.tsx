import React, { PureComponent } from 'react'
import { EditorField } from '../ux/EditorField'
import { EditorString } from '../ux/EditorString'
import { Model } from '../model/Model'

export type ChartNameEditorProps = {
  value: Model
  onChange: (model: Model) => void
}

export class ChartNameEditor extends PureComponent<ChartNameEditorProps> {
  private onNameChanged = (name: string) => {
    const { onChange, value } = this.props
    onChange({ ...value, name })
  }

  private renderNameEditor() {
    const { value } = this.props
    return (
      <EditorField name="Name" description="The name of your song or jam track">
        <EditorString value={value.name} onChange={this.onNameChanged} />
      </EditorField>
    )
  }

  render() {
    return this.renderNameEditor()
  }
}
