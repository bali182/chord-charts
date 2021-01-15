import { Model } from '../../../common/Model'
import { id } from '../../../common/utils'

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
