const LOCALE = 'fr-FR'
const CURRENCY = 'EUR'

const priceFormatter = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY })
const dateFormatter = new Intl.DateTimeFormat(LOCALE, { dateStyle: 'medium' })
const dateTimeFormatter = new Intl.DateTimeFormat(LOCALE, { dateStyle: 'medium', timeStyle: 'short' })

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount)
}

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate))
}

export function formatDateTime(isoDate: string): string {
  return dateTimeFormatter.format(new Date(isoDate))
}
