import fastify from 'fastify'
import { ChartModel } from '../common/Model'
import { Theme } from '../common/Theme'

const app = fastify()

interface CreateVideoBody {
  theme: Theme
  chart: ChartModel
}

app.get<{ Body: CreateVideoBody }>('/create-video', async (req, reply) => {
  const { chart, theme } = req.body
  return {
    theme,
    chart,
  }
})

app.listen(3000).then(() => {
  console.log('Server running at http://localhost:3000/')
})
