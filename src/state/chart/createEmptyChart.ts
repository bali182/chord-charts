import { id } from '../../chart/utils'
import { Model } from '../../model/Model'

export function createEmptyChart(): Model {
  return {
    id: id(),
    name: 'Sample model',
    bpm: 120,
    key: 'A minor',
    sections: [],
    sectionSequence: [],
  }
}
