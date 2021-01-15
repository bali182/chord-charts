import { sampleModel, sampleTheme } from '../common/sampleModel'
import { createPngs, createVideo } from './createVideo'
import { resolve } from 'path'

describe('createVideo', () => {
  it('should create video from sample', async () => {
    const imgs = await createPngs(sampleModel, sampleTheme, resolve('images'))
    await createVideo(sampleModel, imgs, resolve('images/video.mp4'))
  })
})
