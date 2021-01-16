import { customAlphabet } from 'nanoid'
import { TimeSignature } from './Model'

export function range(from: number, to: number): number[] {
  const values = []
  for (let i = from; i < to; i += 1) {
    values.push(i)
  }
  return values
}

export function sum(a: number, b: number): number {
  return a + b
}

export function isNil(input: any): input is null | undefined {
  return input === null || input === undefined
}

export function flatMap<T, E>(list: T[], fn: (item: T) => E[]): E[] {
  const results: E[] = []
  for (let i = 0, length = list.length; i < length; i += 1) {
    results.push(...fn(list[i]))
  }
  return results
}

function moveMutate<T>(array: T[], from: number, to: number): void {
  const startIndex = from < 0 ? array.length + from : from

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = to < 0 ? array.length + to : to

    const [item] = array.splice(from, 1)
    array.splice(endIndex, 0, item)
  }
}

export function move<T>(array: T[], from: number, to: number): T[] {
  const _array = Array.from(array)
  moveMutate(_array, from, to)
  return _array
}

export function barToMs(bpm: number, timeSignature: TimeSignature) {
  return (60 / bpm) * timeSignature.upper * 1000
}

export const id = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 5)
