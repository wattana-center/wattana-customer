import { Icon, InputAdornment, Stack, TextField } from '@mui/material'

import React from 'react'
import { bookingStyles } from './Utils'
import { useSearch } from '@app/redux-store/search'
import { useSelector } from '@app/helpers'

const BookingStays: React.FC = () => {
  const data = useSelector((s) => s.search)
  const search = useSearch()
  const classes = bookingStyles()

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon className={classes.icon}>supervisor_account</Icon>
            </InputAdornment>
          )
        }}
        placeholder={'ผู้ใหญ่ 2 คน'}
        type="number"
        value={`${data.adults}`}
        onChange={(e) => {
          search.update({
            ...data,
            adults: parseInt(e.target.value)
          })
        }}
      />
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon className={classes.icon}>supervisor_account</Icon>
            </InputAdornment>
          )
        }}
        placeholder={'เด็ก 1 คน'}
        type="number"
        value={`${data.children}`}
        onChange={(e) => {
          search.update({
            ...data,
            children: parseInt(e.target.value)
          })
        }}
      />
    </Stack>
  )
}

export { BookingStays }
