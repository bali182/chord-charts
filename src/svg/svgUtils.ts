export function createRoundedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  topLeft: number,
  topRight: number,
  bottomRight: number,
  bottomLeft: number
): string {
  return (
    // Move to position, offset by radius in x direction
    `M${x + topLeft},${y}` +
    // Draw a horizontal line to the top right curve start
    `h${width - (topLeft + topRight)}` +
    // Draw the top right corner curve
    `a${topRight},${topRight} 0 0 1 ${topRight},${topRight}` +
    // Draw a vertical line to the bottom right corner
    `v${height - (topRight + bottomRight)}` +
    // Draw the bottom right corner curve
    `a${bottomRight},${bottomRight} 0 0 1 ${-bottomRight}, ${bottomRight}` +
    // Draw a horizontal line to the bottom left corner
    `h${bottomLeft + bottomRight - width}` +
    // Draw the bottom left corner
    `a${-bottomLeft},${-bottomLeft} 0 0 1 ${-bottomLeft}, ${-bottomLeft}` +
    // Draw a vertical line to the top left corner
    `v${topLeft + bottomLeft - height}` +
    // Draw the top left corner
    `a${topLeft},${-topLeft} 0 0 1 ${topLeft},${-topLeft}` +
    // Close the shape
    'z'
  )
}
