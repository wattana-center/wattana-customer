import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Icon,
  Rating,
  Slider,
  Stack,
  Typography
} from '@mui/material'
import { Colors, WattanaTheme } from '@app/config'

import Image from 'next/image'
import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: WattanaTheme.spacing(2),
    paddingBottom: WattanaTheme.spacing(2)
  },
  title: {
    color: '#C99400'
  },
  bt: {
    background: '#fff',
    color: '#000',
    '&:hover': {
      background: Colors.primaryColor,
      color: '#fff'
    }
  }
}))

const checkboxList = [
  'WiFi',
  'สระว่ายน้ำ',
  'ที่จอดรถ',
  'ห้องอาหาร',
  'แผนกต้อนรับ 24 ชม.',
  'ลิฟท์',
  'รองรับเก้าอี้รถเข็น',
  'ฟิตเนส',
  'มีอุปกรณ์สำหรับการจัดประชุม',
  'รถรับ-ส่งสนามบิน'
]

function valuetext(value: number) {
  return `฿${value}`
}

const img = '/images/Image19.png'

const FilterHotels: React.FC = () => {
  const [rate, setRate] = React.useState<number | null>(2)
  const [value, setValue] = React.useState<number[]>([0, 10000])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  const classes = useStyles()

  return (
    <>
      <Stack spacing={2} justifyContent="space-between" direction="row">
        <Typography variant="body1">กรองผลการค้นหา</Typography>
        <Icon>filter_list</Icon>
      </Stack>

      <Divider style={{ marginTop: 15, marginBottom: 15 }} />

      <Stack spacing={2} justifyContent="space-between" direction="row">
        <Typography variant="body1" className={classes.title}>
          จำกัดราคาต่อเดือน
        </Typography>
        <Icon>keyboard_arrow_up</Icon>
      </Stack>

      <Stack spacing={2} justifyContent="space-between" direction="row">
        <Typography variant="body1">{valuetext(value[0])}</Typography>
        <Typography variant="body1">{valuetext(value[1])}</Typography>
      </Stack>

      <Slider
        value={value}
        onChange={handleChange}
        min={0}
        max={100000}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider-demo"
        getAriaValueText={valuetext}
      />

      <Divider style={{ marginTop: 15, marginBottom: 15 }} />

      <Typography variant="body1" className={classes.title}>
        สิ่งอำนวยความสะดวก
      </Typography>

      <FormGroup>
        {checkboxList.map((v, i) => (
          <FormControlLabel key={i} control={<Checkbox />} label={v} />
        ))}
      </FormGroup>

      <Divider style={{ marginTop: 15, marginBottom: 15 }} />

      <Stack spacing={2} justifyContent="space-between" direction="row">
        <Typography variant="body1" className={classes.title}>
          ระดับดาว
        </Typography>

        <Rating
          name="simple-controlled"
          value={rate}
          onChange={(event, newValue) => {
            setRate(newValue)
          }}
        />
      </Stack>

      <Divider style={{ marginTop: 15, marginBottom: 15 }} />

      <Image
        alt=""
        src={img}
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
      />
    </>
  )
}

export { FilterHotels }
