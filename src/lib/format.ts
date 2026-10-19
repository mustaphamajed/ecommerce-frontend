const LOCALE = 'fr-FR'
const CURRENCY = 'EUR'

const priceFormatter = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY })
const dateFormatter = new Intl.DateTimeFormat(LOCALE, { dateStyle: 'medium' })

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount)
}

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate))
}
