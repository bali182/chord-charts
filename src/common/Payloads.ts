import { ChartModel } from './Model'
import { Theme } from './Theme'

export type CreateVideoPayload = {
  theme: Theme
  chart: ChartModel
}

export type CreateVideoResponse = {
  url: string
}

export type DownloadVideoQuery = {
  q: string
}

export type ErrorResponse = {
  error: string
}
