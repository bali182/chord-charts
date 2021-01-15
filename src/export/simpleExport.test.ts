import { sampleModel, sampleTheme } from '../model/sampleModel'
import { createPngs } from './createVideo'
import { resolve } from 'path'
import videoshow from 'videoshow'
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'

describe('simple videoshow video creation', () => {
  // Run this first to get the images ready for video creation
  it('should generate the images to use for the video', async () => {
    await createPngs(sampleModel, sampleTheme, resolve('images'))
  })

  it('should generate the video from the pre-created images', async () => {
    // All the frames, if they don't exist, you can generate them by running test above (remove x from xit)
    const frames = [
      { loop: 1000, path: resolve('images/bar_idle.png') },
      { loop: 2000, path: resolve('images/bar_1.png') },
      { loop: 2000, path: resolve('images/bar_2.png') },
      { loop: 2000, path: resolve('images/bar_3.png') },
      { loop: 2000, path: resolve('images/bar_4.png') },
      { loop: 2000, path: resolve('images/bar_5.png') },
      { loop: 2000, path: resolve('images/bar_6.png') },
      { loop: 2000, path: resolve('images/bar_7.png') },
      { loop: 2000, path: resolve('images/bar_8.png') },
      { loop: 2000, path: resolve('images/bar_9.png') },
      { loop: 2000, path: resolve('images/bar_10.png') },
      { loop: 2000, path: resolve('images/bar_11.png') },
      { loop: 2000, path: resolve('images/bar_12.png') },
    ]

    // Config for the output video
    const config = {
      fps: 30,
      transition: false,
      videoBitrate: 1024,
      videoCodec: 'libx264',
      size: '1280x720',
      format: 'mp4',
      pixelFormat: 'yuv420p',
    }

    // Output video path, in the project folder in images
    const outputPath = resolve('images/video.mp4')

    // Portable version of ffmpeg
    videoshow.ffmpeg.setFfmpegPath(ffmpegPath)

    // "Promisify" it to make it easier to work with in tests
    await new Promise((resolve, reject) => {
      videoshow(frames, config)
        .save(outputPath)
        .on('error', (error: Error) => {
          console.log('error', error)
          reject(error)
        })
        .on('end', (result: any) => {
          console.log('done', result)
          resolve(null)
        })
    })
  })
})
