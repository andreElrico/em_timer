export function coerceToAtLeastOne(value: any): number {
    const num = Number(value); // Attempt to convert to a number
  
    if (isNaN(num) || num < 1) {
      return 1;
    }
  
    return num;
}