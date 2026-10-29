// Keep full-screen scenes crisp on Retina displays without unbounded GPU buffers.
export function scenePixelRatio(width, height, deviceRatio = 1, coarse = false, maxSize = Infinity) {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return 1;
  const nativeRatio = Number.isFinite(deviceRatio) ? Math.max(1, deviceRatio) : 1;
  const pixels = width * height;
  // Never undersample CSS pixels merely because the stage fills a large screen.
  const budget = Math.max(pixels, coarse ? 4200000 : 8400000);
  const sizeLimit = maxSize > 0 ? Math.min(maxSize / width, maxSize / height) : 1;
  return Math.min(nativeRatio, coarse ? 3 : 2, Math.sqrt(budget / pixels), sizeLimit);
}
