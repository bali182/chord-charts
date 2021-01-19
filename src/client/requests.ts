import { CreateVideoPayload } from '../common/Payloads'

export const baseUrl = ''

export function createVideo(payload: CreateVideoPayload): Promise<string> {
  const config: RequestInit = {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
    },
  }
  return fetch(`${baseUrl}/create-video`, config).then((response) => {
    if (response.status !== 200) {
      return response.text().then((text) => Promise.reject(new Error(text)))
    }
    return response.json().then(({ url }) => url)
  })
}
