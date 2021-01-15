import { Model } from '../../model/Model'
import { id } from '../../utils'

export function createEmptyChart(): Model {
  return {
    id: id(),
    name: 'New chord chart',
    bpm: 120,
    key: 'A minor',
    timeSignature: {
      lower: 4,
      upper: 4,
    },
    sections: [],
    arrangement: [],
  }
}
