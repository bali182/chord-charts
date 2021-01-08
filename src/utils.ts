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
