import React from 'react'
import { render } from 'react-dom'
import { sampleModel, sampleTheme } from './sampleModel'
import { HtmlChordChart } from './html/HtmlChordChart'

render(<HtmlChordChart model={sampleModel} theme={sampleTheme} />, document.getElementById('root'))
