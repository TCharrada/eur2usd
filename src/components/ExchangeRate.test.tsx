import { render, screen } from '@testing-library/react'
import ExchangeRate from './ExchangeRate'
import { describe, it, expect } from 'vitest'

import { calcNewRate } from '../utils/calc'


const EXCHANGE_RATE_INTERVAL = [0.05, -0.05]
const EXCHANGE_RATE_DEFAULT = 1.1


describe('ExchangeRate Component', () => {
  it('renders component correctly', () => {
    render(<ExchangeRate />)
    expect(screen.getByText('EUR - USD Converter')).toBeTruthy()
  })
})

describe('ExchangeRate Component Methods', () => {
  it('calculate new rate render correct value', async () => {
    const liveRate = calcNewRate(EXCHANGE_RATE_DEFAULT, EXCHANGE_RATE_INTERVAL)
    expect(liveRate).to.toBeLessThanOrEqual(1.15)
    expect(liveRate).to.toBeGreaterThanOrEqual(1.05)
  })
})