import { id } from '../../chart/utils'
import { Model } from '../../model/Model'

export function createEmptyChart(): Model {
  return {
    id: id(),
    name: 'New chord chart',
    bpm: 120,
    key: 'A minor',
    sections: [],
    sectionSequence: [],
  }
}
