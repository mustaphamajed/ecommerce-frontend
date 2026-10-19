const LOCALE = 'fr-FR'
const CURRENCY = 'EUR'

const priceFormatter = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY })

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount)
}
