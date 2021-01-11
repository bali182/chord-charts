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
