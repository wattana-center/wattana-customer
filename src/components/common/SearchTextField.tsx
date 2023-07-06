import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  TextField,
  Tooltip
} from '@mui/material'
import { HotelOutlined, MapOutlined } from '@mui/icons-material'
import { PlaceSearchApi, SearchApi } from '@app/apis'
import React, { useEffect, useState } from 'react'

import { BookingOptions } from './Utils'
import { useSearch } from '@app/redux-store/search'
import { useSelector } from '@app/helpers'

const SearchTextField: React.FC = () => {
  const data = useSelector((s) => s.search)
  const search = useSearch()

  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [options, setOptions] = useState<BookingOptions[]>([])
  const [loading, setLoading] = useState(false)

  const getBusiness = async (str: string) => {
    const searchApi = new SearchApi()
    const placeApi = new PlaceSearchApi()
    let set: BookingOptions[] = []
    const local = await searchApi.search(str).then((res) => {
      if (res.status === 200) {
        if (res.data.total_records > 0) {
          return res.data.data.map((i) => ({
            value: i.name,
            label: 'โรงแรม'
          }))
        }
      }
    })

    if (local && local.length > 0) set = [...local]
    if (str.length > 5) {
      const google = await placeApi.search(str).then((res) => {
        if (res.status === 200) {
          if (res.data.results.length > 0) {
            return res.data.results.map((i) => ({
              value: i.name,
              label: 'สถานที่',
              lat: i.geometry.location.lat,
              lng: i.geometry.location.lng
            }))
          }
        }
      })

      if (google && google?.length > 0) set = [...set, ...google]
    }

    setLoading(false)
    setOptions(() => [...set])
  }

  useEffect(() => {
    if (open) {
      setLoading(true)
      const delayDebounceFn = setTimeout(() => {
        getBusiness(searchTerm)
      }, 500)

      return () => clearTimeout(delayDebounceFn)
    }
  }, [open, searchTerm])

  useEffect(() => {
    getBusiness('')
  }, [])

  return (
    <Tooltip sx={{ cursor: 'pointer' }} title="สถานที่, ชื่อโรงแรม, จังหวัด">
      <Autocomplete
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        value={data.options}
        onChange={(event, newValue) => {
          if (newValue != null) {
            search.update({
              ...data,
              options: newValue as BookingOptions
            })
          }
        }}
        getOptionLabel={(option) => option.value}
        options={options}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{
              fontSize: 15,
              '& > span': { mr: '10px', fontSize: 18 }
            }}
            {...props}>
            {option.label === 'โรงแรม' ? (
              <Chip
                icon={<HotelOutlined />}
                label="โรงแรม"
                sx={{ marginRight: 1 }}
              />
            ) : (
              <Chip
                icon={<MapOutlined />}
                label="สถานที่"
                sx={{ marginRight: 1 }}
              />
            )}
            {option.value}
          </Box>
        )}
        fullWidth
        loading={loading}
        onInputChange={(event, newInputValue) => {
          setSearchTerm(newInputValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={'สถานที่, ชื่อโรงแรม, จังหวัด'}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
    </Tooltip>
  )
}

export { SearchTextField }
