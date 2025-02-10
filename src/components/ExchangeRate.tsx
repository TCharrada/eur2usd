import { useState, useEffect } from 'react';
import { Typography, Container, TextField, Chip, IconButton } from "@mui/material"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Grid from '@mui/material/Grid2';
import { calcNewRate } from '../utils/calc';

const EXCHANGE_RATE_INTERVAL = [0.05, -0.05]
const EXCHANGE_RATE_DEFAULT = 1.1
const EXCHANGE_RATE_UPDATE_INTERVAL = 3000

export default function ExchangeRate() {

  const [amountEUR, setAmountEUR] = useState(0)
  const [amountUSD, setAmountUSD] = useState(0)
  const [currencySwitchEUR2USD, setCurrencySwitchEUR2USD] = useState(true)

  const [exchangeRate, setExchangeRate] = useState(EXCHANGE_RATE_DEFAULT)


  useEffect(() => {
    setInterval(() => {
      const newExchangeRate = calcNewRate(EXCHANGE_RATE_DEFAULT, EXCHANGE_RATE_INTERVAL)
      setExchangeRate(newExchangeRate)
    }, EXCHANGE_RATE_UPDATE_INTERVAL)
  }, [])

  const handleEURChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.currentTarget.value)
    const newAmountUSD = Math.round(newAmount * exchangeRate * 100) / 100
    setAmountEUR(newAmount)
    setAmountUSD(newAmountUSD)
  }

  const handleUSDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.currentTarget.value)
    const newAmountEUR = Math.round(newAmount / exchangeRate * 100) / 100
    setAmountUSD(newAmount)
    setAmountEUR(newAmountEUR)
  }

  const handleSwitchCurrency = () => {
    setCurrencySwitchEUR2USD(!currencySwitchEUR2USD)
  }

  return (
    <Container component="main" maxWidth="xs" >
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ marginTop: '50px' }}>
        <Grid size={12}>
          <Typography variant="h4" align="center" gutterBottom>
          EUR - USD Converter
          </Typography>
          <Typography variant="h5">
            Live Exchange Rate <Chip label={exchangeRate} variant="filled" color='info' data-testid="live-rate" />
          </Typography>
        </Grid>
        <Grid size={12}>
          {currencySwitchEUR2USD ?
            <TextField
              label="EUR €"
              type="number"
              variant="outlined"
              fullWidth
              value={amountEUR}
              onChange={handleEURChange}

            />
            :
            <TextField
              label="USD $"
              type="number"
              variant="outlined"
              fullWidth
              value={amountUSD}
              onChange={handleUSDChange}
            />
          }
        </Grid>
        <IconButton color="info"  onClick={handleSwitchCurrency}>
          <CurrencyExchangeIcon />
        </IconButton>
        <Grid size={12}>
          {currencySwitchEUR2USD ?
            <Typography variant="h4" align="center">
              {amountUSD} $
            </Typography>
            :
            <Typography variant="h4" align="center">
              {amountEUR} € 
            </Typography>
          }
          
        </Grid>
      </Grid>
    </Container>
  )
}