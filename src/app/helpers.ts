export function coerceToAtLeastOne(value: any): number {
  const num = Number(value); // Attempt to convert to a number

  if (isNaN(num) || num < 1) {
    return 1;
  }

  return num;
}

export function formatSecondsToMmSs(totalSeconds: number) {
  const secs = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
