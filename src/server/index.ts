import { CreateVideoResponse } from '../common/Payloads'
import { Generator } from './Generator'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { join } from 'path'

const app = express()

app.use(bodyParser.json())
app.use(cors())

const clientPath = join(process.cwd(), 'dist', 'client')

console.log('client path', clientPath)

app.post('/create-video', async (req, reply) => {
  const { chart, theme } = req.body
  const generator = new Generator(chart, theme)
  const path = await generator.run()
  const response: CreateVideoResponse = {
    url: path,
  }
  reply.status(200).header('content-type', 'application/json; charset=utf-8').send(response)
})

app.get('/download', async (req, reply) => {
  const { q } = req.query
  const videoPath = Generator.videoPathFor(q as string)
  reply.type('video/mp4').sendFile(videoPath)
})

app.use(express.static(clientPath))

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/')
})
