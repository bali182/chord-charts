import { sampleModel, sampleTheme } from '../model/sampleModel'
import { createPngs, createVideo } from './createVideo'
import ffmpeg from 'fluent-ffmpeg'
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import { resolve } from 'path'

describe('createVideo', () => {
  it('should create video from sample', async () => {
    ffmpeg.setFfmpegPath(ffmpegPath)
    const imgs = await createPngs(sampleModel, sampleTheme, resolve('images'))
    await createVideo(sampleModel, sampleTheme, imgs, resolve('images/video.mp4'))
  })
})
