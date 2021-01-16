import { CreateVideoPayload } from '../common/Payloads'

export const baseUrl = 'http://localhost:3000'

export function createVideo(payload: CreateVideoPayload): Promise<any> {
  const config: RequestInit = {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
    },
  }
  return fetch(`${baseUrl}/create-video`, config).then((response) => response.text())
}
