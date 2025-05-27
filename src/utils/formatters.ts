
export function formatPercent(value: number, multHundred = false): string {
  if (isNaN(value)) {
    return '-'
  }
  const multiplier = multHundred ? 100 : 1
  return `${(value * multiplier).toFixed(2)}%`
}


export function formatCurrency(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0.00';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

export function formatSimplifiedNumber(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(num);
}