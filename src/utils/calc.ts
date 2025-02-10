
export const calcNewRate = (exchangeRateDefault: number, exchangeRateInterval: number[]) => {
  const randomRateIndex = Math.floor(Math.random() * exchangeRateInterval.length)
  const newRate = exchangeRateDefault+exchangeRateInterval[randomRateIndex]
  return Math.round(newRate * 100) / 100
}