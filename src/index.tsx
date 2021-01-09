import React from 'react'
import { render } from 'react-dom'
import { sampleModel, sampleTheme } from './model/sampleModel'
import { ChordChart } from './html/ChordChart'

render(<ChordChart model={sampleModel} theme={sampleTheme} />, document.getElementById('root'))
