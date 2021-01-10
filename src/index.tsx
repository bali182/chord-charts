import React from 'react'
import { render } from 'react-dom'
import { sampleModel, sampleTheme } from './model/sampleModel'
import { ChordChart } from './chart/ChordChart'

render(
  <ChordChart model={sampleModel} theme={sampleTheme} selection={null} readOnly={false} />,
  document.getElementById('root')
)
