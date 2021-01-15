import { sampleModel, sampleTheme } from '../model/sampleModel'
import { createBrowser, toPng } from './createVideo'
import fs from 'fs'

import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import videoshow from 'videoshow'
// import { range } from '../utils'

describe('generate', () => {
  it('should create all bars highlighted image as png using puppeteer', async () => {
    const browser = await createBrowser(sampleTheme)
    const page = await browser.newPage()
    let counter = 1
    for (const section of sampleModel.sections) {
      for (const bar of section.bars) {
        // const counterStr = (counter++).toString().padStart(3, '0')
        // const sName = section.name.replace(/\s+/g, '_').toLowerCase()
        const buffer = await toPng(page, sampleTheme, sampleModel, { id: bar.id, type: 'bar-selection' })
        fs.writeFileSync(`images/img_${counter++}.png`, buffer)
        // fs.writeFileSync(`images/${counterStr}_${sName}_${bar.id}.png`, buffer)
      }
    }
    await browser.close()
  })

  it('should generate video using videoshow', async () => {
    ffmpeg.setFfmpegPath(ffmpegPath)

    const config = {
      fps: 30,
      transition: false,
      videoBitrate: 1024,
      videoCodec: 'libx264',
      size: '1280x720',
      format: 'mp4',
      pixelFormat: 'yuv420p',
    }

    const paths = [
      {
        loop: 1000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_idle.png',
      },
      {
        loop: 2000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_8sKGF.png',
      },
      {
        loop: 2000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_AUpDS.png',
      },
      {
        loop: 2000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_OS7cw.png',
      },
      {
        loop: 2000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_4AqZY.png',
      },
      {
        loop: 2000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_5d6dC.png',
      },
      {
        loop: 2000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_lWyKa.png',
      },
      {
        loop: 2000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_zOQol.png',
      },
      {
        loop: 2000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_CkKns.png',
      },
      {
        loop: 2000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_TiXvG.png',
      },
      {
        loop: 2000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_AKnvj.png',
      },
      {
        loop: 2000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_0naKH.png',
      },
      {
        loop: 2000,
        path: 'C:\\Users\\edesb\\AppData\\Local\\Temp\\bar_GcLeo.png',
      },
    ]

    await new Promise((done, error) => {
      videoshow(paths, config).save('images/video.mp4').on('error', error).on('end', done)
    })
  })
})
