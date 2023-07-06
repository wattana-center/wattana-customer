import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'

import React from 'react'
import { useSearch } from '@app/redux-store/search'
import { useSelector } from '@app/helpers'

const monthRadio = [1, 3, 6, 12]

const BookingRadio: React.FC = () => {
  const data = useSelector((s) => s.search)
  const search = useSearch()

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">จำนวนเดือนเข้าพัก</FormLabel>
        <RadioGroup
          row
          aria-label="จำนวนเดือนเข้าพัก"
          name="option-month-group">
          {monthRadio.map((v, i) => (
            <FormControlLabel
              key={`radio-month-${i}`}
              checked={
                !data.otherMonth ? (data.month === v ? true : false) : false
              }
              onClick={() => {
                search.update({
                  ...data,
                  month: v,
                  otherMonth: false
                })
              }}
              value={`${v}m`}
              control={<Radio />}
              label={`${v} month`}
            />
          ))}
          <FormControlLabel
            checked={data.otherMonth}
            onClick={() => {
              search.update({ ...data, otherMonth: true })
            }}
            value="other"
            control={<Radio />}
            label={
              <>
                <TextField
                  sx={
                    !data.otherMonth
                      ? {
                          display: 'none'
                        }
                      : { display: 'block' }
                  }
                  variant="standard"
                  size="small"
                  type="number"
                  value={data.month}
                  onChange={(v) => {
                    search.update({
                      ...data,
                      month: parseInt(v.target.value)
                    })
                  }}
                />
                <Typography
                  sx={
                    data.otherMonth
                      ? {
                          display: 'none'
                        }
                      : { display: 'block' }
                  }>
                  อื่นๆ
                </Typography>
              </>
            }
          />
        </RadioGroup>
      </FormControl>
    </>
  )
}

export { BookingRadio }
